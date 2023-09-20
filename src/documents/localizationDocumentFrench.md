# Personnalisez la langue et le texte dans vos espaces Flatfile

---

Activez les traductions, les personnalisations et les remplacements de texte pour vos espaces en toute simplicité grâce au support de localisation de Flatfile.

## Création de cet espace

Cet espace a été configuré avec des options de localisation.

Voici un aperçu du code qui a été utilisé pour le créer :

```jsx
import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";

export default function flatfileEventListener(listener: Client) {
  listener.filter({ job: "space:configure" }, (configure: FlatfileListener) => {
    configure.on(
      "job:ready",
      async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
        try {
          await api.jobs.ack(jobId, {
            info: "Job started.",
            progress: 10,
          });

          //Documents are using translation keys instead of hardcoding strings
          const document = await api.documents.create(spaceId, {
            title: "myDocument.title",
            body: "myDocument.body",
          });

          //Setting the translation path for the space
          await api.spaces.update(spaceId, {
            metadata: {
              sidebarConfig: {
                defaultPage: {
                  documentId: document.data.id,
                },
              },
            },
            translationsPath:
              "https://raw.githubusercontent.com/FlatFilers/Platform-Translations/kitchen-sink/locales/en/translation.json",
          });


          await api.workbooks.create({
            spaceId,
            environmentId,
            ...
          });

          await api.jobs.complete(jobId, {
            outcome: {
              message: "Job completed.",
            },
          });
        } catch (error: any) {
          console.error("Error: ", error.stack);

          await api.jobs.fail(jobId, {
            outcome: {
              message: "Job error.",
            },
          });
        }
      }
    );
  });
}
```

## Ce que vous pouvez faire ici

Essayez différentes langues pour vous amuser avec des chiots ! 🌍

Ne serait-ce pas génial si les chiots pouvaient parler toutes les langues ? Eh bien, ici, dans notre aire de jeux de localisation de chiots, vous pouvez vivre exactement cela !

🐕 Essayez-le :

- **Anglais** : Ajoutez simplement `?lng=en` à l'URL et rechargez la page pour une expérience adaptée au Pointer anglais !
- **Allemand** : Ajoutez `?lng=de` à la fin de l'URL et appuyez sur Entrée pour une expérience allemande qui fait ouaf !
- **Français** : Utilisez `?lng=fr` pour une délicieuse traduction française que même les caniches français approuveraient !
- **Espagnol** : Envie d'aboyer en espagnol ? Ajoutez simplement `?lng=es` à l'URL.

Nous n'apprenons pas aux chiots à traduire, mais notre fichier de traduction.json magique fait le travail. Le meilleur ? Notre page Markdown se met à jour dynamiquement en fonction de la langue sélectionnée ! Pas besoin de coder en dur. 🪄

Alors, pendant que vous naviguez dans notre aire de jeux de localisation de chiots, remarquez comment les mots se transforment dans la langue que vous choisissez. 🌟

Allez-y, essayez-le ! Explorez le monde des chiots dans différentes langues et découvrez comment la localisation rend le web encore plus accueillant pour tout le monde ! 🌐

Consultez nos [traductions enrichies pour chiots ici](https://github.com/FlatFilers/Platform-Translations/blob/kitchen-sink/locales/en/translation.json). Vous pouvez également consulter le code source de cet espace en [TypeScript](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/typescript/localization/index.ts) et en [JavaScript](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/javascript/localization/index.js).

## Documentation complémentaire

En savoir plus sur la personnalisation du texte de votre espace [ici](https://flatfile.com/docs/guides/localization).

Apprenez-en plus sur Flatfile en essayant nos [autres démos](https://platform.flatfile.com/getting-started)
