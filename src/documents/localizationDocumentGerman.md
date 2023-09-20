# Passen Sie die Sprache und den Text in Ihren Flatfile Spaces an

---

Aktivieren Sie Übersetzungen, Anpassungen und Textüberschreibungen für Ihre Spaces ganz einfach mit der Lokalisierungsunterstützung von Flatfile.

## Was Sie hier tun können

Probieren Sie verschiedene Sprachen für Spaß mit süßen Welpen aus! 🌍

Wäre es nicht großartig, wenn Welpen jede Sprache sprechen könnten? Nun, hier in unserem Welpen-Lokalisierungs-Spielplatz können Sie genau das erleben!

🐕 Probieren Sie es aus:

- **Englisch**: Fügen Sie einfach `?lng=en` am Ende der URL hinzu und laden Sie die Seite neu, um eine Erfahrung für den Englischen Pointer zu erhalten!
- **Deutsch**: Hängen Sie `?lng=de` an das Ende der URL an und drücken Sie Enter für eine hervorragende deutsche Erfahrung.
- **Französisch**: Verwenden Sie `?lng=fr` für eine charmante französische Übersetzung, die selbst französische Pudel gutheißen würden!
- **Spanisch**: Möchten Sie auf Spanisch bellen? Fügen Sie einfach `?lng=es` zur URL hinzu.

Wir bringen den Welpen nicht bei, zu übersetzen, aber unsere magische translation.json-Datei erledigt den Trick. Das Beste daran? Unsere Markdown-Seite aktualisiert sich dynamisch basierend auf der ausgewählten Sprache! Keine harte Programmierung erforderlich. 🪄

Also, während Sie durch unseren Welpen-Lokalisierungs-Spielplatz navigieren, achten Sie darauf, wie sich die Wörter in die von Ihnen gewählte Sprache verwandeln. 🌟

Probieren Sie es aus! Erkunden Sie die Welt der Welpen in verschiedenen Sprachen und sehen Sie, wie die Lokalisierung das Internet zu einem schwanzwedelnden Ort für alle macht! 🌐

Schauen Sie sich unsere [verhunderten Übersetzungen hier an](https://github.com/FlatFilers/Platform-Translations/blob/kitchen-sink/locales/en/translation.json). Sie können auch den Quellcode für diesen Space in [TypeScript](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/typescript/localization/index.ts) und in [JavaScript](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/javascript/localization/index.js) überprüfen.

## Erstellung dieses Spaces

Dieser Space wurde mit Lokalisierungsoptionen konfiguriert.

Hier erhalten Sie einen Einblick in den Code, der verwendet wurde, um ihn zu erstellen:

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

## Weitere Dokumentation

Erfahren Sie mehr darüber, wie Sie den Text Ihres Spaces anpassen können [hier](https://flatfile.com/docs/guides/localization).

Erfahren Sie mehr über Flatfile, indem Sie unsere [anderen Demos ausprobieren](https://platform.flatfile.com/getting-started)
