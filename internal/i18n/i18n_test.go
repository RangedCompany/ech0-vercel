// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

package i18n

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lin-snow/ech0/internal/database"
	commonModel "github.com/lin-snow/ech0/internal/model/common"
	userModel "github.com/lin-snow/ech0/internal/model/user"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func TestSanitizeAcceptLanguage(t *testing.T) {
	cases := []struct {
		name string
		in   string
		want string
	}{
		{"empty", "", ""},
		{"legit browser header", "en-US,en;q=0.9,zh-CN;q=0.8", "en-US,en;q=0.9,zh-CN;q=0.8"},
		{"extended subtag", "zh-Hant-TW", "zh-Hant-TW"},
		{"at cap", strings.Repeat("a-", maxAcceptLanguageSeparators), strings.Repeat("a-", maxAcceptLanguageSeparators)},
		{"over cap hyphen", strings.Repeat("a-", maxAcceptLanguageSeparators+1), ""},
		{"underscore bypass (GHSA-mqxv-9rm6-w8qc)", strings.Repeat("_", 10_000), ""},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := sanitizeAcceptLanguage(tc.in); got != tc.want {
				t.Fatalf("sanitizeAcceptLanguage(%q) = %q, want %q", tc.in, got, tc.want)
			}
		})
	}
}

func TestResolveLocaleLegit(t *testing.T) {
	if got := ResolveLocale("en-US,en;q=0.9,zh-CN;q=0.8"); got != "en-US" {
		t.Fatalf("ResolveLocale legit = %q, want en-US", got)
	}
}

func TestResolveLocaleCanonicalCatalog(t *testing.T) {
	for input, want := range map[string]string{
		"": "fr-FR", "fr": "fr-FR", "fr-CA": "fr-FR", "fr_BE": "fr-FR",
		"ko-KR": "fr-FR", "en-GB": "en-US", "de-AT": "de-DE", "ja": "ja-JP", "zh": "zh-CN",
	} {
		require.Equal(t, want, ResolveLocale(input), "input: %q", input)
	}
}

func TestCatalogParity(t *testing.T) {
	load := func(locale string) map[string]bool {
		t.Helper()
		raw, err := localeFS.ReadFile("locales/" + locale + ".json")
		require.NoError(t, err)
		var messages []struct {
			ID          string `json:"id"`
			Translation string `json:"translation"`
		}
		require.NoError(t, json.Unmarshal(raw, &messages))
		ids := make(map[string]bool, len(messages))
		for _, msg := range messages {
			require.NotEmpty(t, msg.ID, locale)
			require.NotEmpty(t, strings.TrimSpace(msg.Translation), "%s: %s", locale, msg.ID)
			require.False(t, ids[msg.ID], "duplicate message in %s: %s", locale, msg.ID)
			ids[msg.ID] = true
		}
		return ids
	}
	want := load("en-US")
	for _, tag := range supportedLocales {
		t.Run(tag.String(), func(t *testing.T) {
			require.Equal(t, want, load(tag.String()))
		})
	}
}

func TestMiddlewareLocaleNegotiation(t *testing.T) {
	db, err := gorm.Open(sqlite.Open(filepath.Join(t.TempDir(), "i18n.db")), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	require.NoError(t, err)
	sqlDB, err := db.DB()
	require.NoError(t, err)
	t.Cleanup(func() { _ = sqlDB.Close() })
	require.NoError(t, db.AutoMigrate(&commonModel.KeyValue{}, &userModel.User{}))
	require.NoError(t, db.Create(&userModel.User{ID: "member", Username: "member", Locale: "ja-JP"}).Error)
	require.NoError(t, db.Create(&userModel.User{ID: "bad-locale", Username: "bad-locale", Locale: "unsupported"}).Error)
	database.SetDB(db)
	t.Cleanup(func() { database.SetDB(nil) })

	router := gin.New()
	router.Use(Middleware())
	router.GET("/", func(ctx *gin.Context) {
		ApplyUserLocaleFromUserID(ctx, ctx.Query("user"))
		ctx.String(http.StatusOK, "%s: %s", LocaleFromGin(ctx),
			Localize(LocalizerFromGin(ctx), commonModel.MsgKeyCommonSuccess, "fallback", nil))
	})
	check := func(target, locale, accept, wantLocale, wantMessage string) {
		t.Helper()
		req := httptest.NewRequest(http.MethodGet, target, nil)
		req.Header.Set("X-Locale", locale)
		req.Header.Set("Accept-Language", accept)
		rec := httptest.NewRecorder()
		router.ServeHTTP(rec, req)
		require.Equal(t, http.StatusOK, rec.Code)
		require.Equal(t, wantLocale, rec.Header().Get("Content-Language"))
		require.True(t, strings.HasPrefix(rec.Body.String(), wantLocale+": "), rec.Body.String())
		if wantMessage != "" {
			require.Equal(t, wantLocale+": "+wantMessage, rec.Body.String())
		}
	}

	check("/", "", "en-US", "fr-FR", "Requête réussie")
	setting := commonModel.KeyValue{
		Key: commonModel.SystemSettingsKey, Value: `{"default_locale":"de-DE"}`,
	}
	require.NoError(t, db.Save(&setting).Error)
	check("/", "", "en-US", "de-DE", "")
	check("/?user=member", "", "en-US", "ja-JP", "")
	check("/?user=bad-locale", "", "", "de-DE", "")
	check("/?user=member", "fr-CA", "en-US", "fr-FR", "Requête réussie")
	check("/?lang=fr&user=member", "en-US", "ja-JP", "fr-FR", "Requête réussie")
	check("/", "unsupported", "en-US", "en-US", "Request succeeded")

	for _, raw := range []string{"", "unsupported"} {
		setting.Value = `{"default_locale":"` + raw + `"}`
		require.NoError(t, db.Save(&setting).Error)
		check("/", "", "en-US", "fr-FR", "Requête réussie")
	}
}

func TestResolveLocaleDefangsQuadraticParse(t *testing.T) {
	malicious := strings.Repeat("_", 1<<20)

	start := time.Now()
	got := ResolveLocale(malicious)
	if elapsed := time.Since(start); elapsed > time.Second {
		t.Fatalf("ResolveLocale took %v on hostile input; quadratic guard regressed", elapsed)
	}
	if got != string(commonModel.FallbackLocale) {
		t.Fatalf("ResolveLocale(malicious) = %q, want fallback %q", got, commonModel.FallbackLocale)
	}
}
