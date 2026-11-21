<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<!-- Copyright (C) 2025-2026 lin-snow -->
<template>
  <img
    src="@/components/icons/Twitter_Verified_Badge.svg"
    :alt="$t('commentSection.verifiedUser')"
    class="w-5 h-5 text-sky-500"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VerifiedIcon',
})
</script>
