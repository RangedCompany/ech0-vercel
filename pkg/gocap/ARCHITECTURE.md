# Architecture de GoCap

La génération du challenge, la validation des solutions et la validation du jeton sont des opérations distinctes. Respecter la durée de validité et empêcher le rejeu lors de la consommation. Le portage utilise une protection partagée pour que deux processus ne puissent pas valider la même opération à usage unique.
