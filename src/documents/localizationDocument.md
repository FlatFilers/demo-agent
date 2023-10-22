# Tailor the language and text in your Flatfile Spaces

---

Enable translations, customizations, and text overrides for your Spaces easily with Flatfile's localization support.

## Things you can do here

Try Different Languages for Some Puppy Fun! 🌍

Wouldn't it be pawsome if puppies could speak every language? Well, here in our Puppy Localization Playground, you can experience just that!

🐕 Give it a try:

- **English**: Just add `?lng=en` to the URL and reload the page for an experience suited to the English Pointer!
- **German**: Append `?lng=de` to the end of the URL and hit enter for a woof-tastic German experience.
- **French**: Use `?lng=fr` for a delightful French translation that even French poodles would approve of!
- **Spanish**: Want to bark in Spanish? Just add `?lng=es` to the URL.

We're not teaching puppies to translate, but our magical translation.json file does the trick. The best part? Our Markdown page updates itself dynamically based on the selected language! No hardcoding needed. 🪄

So, as you navigate through our Puppy Localization Playground, notice how the words transform into the language you choose. 🌟

Go ahead, try it out! Explore the puppy world in different languages and see how localization makes the web a tail-waggingly good place for everyone! 🌐

Check out our [pupified translations here](https://github.com/FlatFilers/Platform-Translations/blob/kitchen-sink/locales/en/translation.json). You can also checkout the source code for this space in [Typescript](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/typescript/localization/index.ts) and in [Javascript](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/javascript/localization/index.js).

## Making this Space

This Space has been configured with localization options.

Here's a look at the code that was used to create it:

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

          await api.jobs.complete(jobId, {});
        } catch (error: any) {
          console.error("Error: ", error.stack);

          await api.jobs.fail(jobId, {
            outcome: {
              message: ":(",
            },
          });
        }
      }
    );
  });
}
```

## Further documentation

Read more about customizing your Space text <a href="https://flatfile.com/docs/guides/localization" target="_blank">here</a>.

## Learn more about Flatfile by trying our [other demos](https://platform.flatfile.com/getting-started)
