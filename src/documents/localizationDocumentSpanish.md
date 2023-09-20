# Personaliza el lenguaje y el texto en tus Espacios de Flatfile

---

Habilita traducciones, personalizaciones y sustituciones de texto fácilmente en tus Espacios con el soporte de localización de Flatfile.

## Cosas que puedes hacer aquí

¡Prueba Diferentes Idiomas para Diversión Cachorresca! 🌍

¿No sería genial si los cachorros pudieran hablar todos los idiomas? Bueno, aquí, en nuestro Patio de Juegos de Localización de Cachorros, ¡puedes experimentar justo eso!

🐕 Inténtalo:

- **Inglés**: Simplemente agrega `?lng=en` al final de la URL y recarga la página para una experiencia adecuada al Pointer inglés.
- **Alemán**: Agrega `?lng=de` al final de la URL y presiona enter para una experiencia alemana increíble.
- **Francés**: Usa `?lng=fr` para una encantadora traducción al francés que incluso los caniches franceses aprobarían.
- **Español**: ¿Quieres ladrar en español? Solo agrega `?lng=es` a la URL.

No estamos enseñando a los cachorros a traducir, pero nuestro archivo de traducción.json mágico hace el truco. ¿Lo mejor? ¡Nuestra página de Markdown se actualiza dinámicamente según el idioma seleccionado! No se necesita programación complicada. 🪄

Así que, mientras navegas por nuestro Patio de Juegos de Localización de Cachorros, nota cómo las palabras se transforman en el idioma que elijas. 🌟

Adelante, ¡pruébalo! ¡Explora el mundo de los cachorros en diferentes idiomas y ve cómo la localización hace que la web sea un lugar donde todos pueden mover la cola con alegría! 🌐

Echa un vistazo a nuestras [traducciones perrunas aquí](https://github.com/FlatFilers/Platform-Translations/blob/kitchen-sink/locales/en/translation.json). También puedes ver el código fuente de este espacio en [TypeScript](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/typescript/localization/index.ts) y en [JavaScript](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/javascript/localization/index.js).

## Creando este Espacio

Este Espacio ha sido configurado con opciones de localización.

Aquí tienes un vistazo al código que se utilizó para crearlo:

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

## Documentación adicional

Lee más sobre cómo personalizar el texto de tu Espacio [aquí](https://flatfile.com/docs/guides/localization).

Aprende más sobre Flatfile probando nuestras [otras demos](https://platform.flatfile.com/getting-started)
