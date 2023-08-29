# Store descriptive information or data that provides additional context

---

Metadata refers is data that provides information about other data. It offers context and details about a particular piece of data, helping to describe and organize it.

Metadata can include various attributes such as the creation date, user, size, format, and more, depending on the context.

In essence, metadata helps in understanding and managing data. In Flatfile, you can store and retrieve additional data about an Environment, Space, Record, or Field without exposing it to end users.

## Making this Space

This Space has been configured with Records that are decorated with metadata.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import simpleWorkbook from "../constants/workbook.json";
import { metadataDocument } from "../constants/documents.json";

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

          const { data } = await api.documents.create(spaceId, {
            title: "About this Metadata Demo",
            body: metadataDocument,
          });

          const documentId = data.id;
          const spaceUpdateParams = {
            metadata: {
              sidebarConfig: {
                defaultPage: {
                  documentId,
                },
              },
            },
          };

          await api.spaces.update(spaceId, spaceUpdateParams);

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

You can see that after creating this Space, this Document is created, and then a Space update call is made to make this Document the default page of this Space.

Like this example, Flatfile uses some values in the Metadata object to support your configurations, but the Metadata object is flexible and open, enabling you to add further details contextualizing your Environments, Spaces, Workbooks, Sheets, and Records.

## Further documentation

Read more about contextualizing your data with descriptive information [here](https://flatfile.com/docs/guides/metadata).

## Learn more about Flatfile by trying our other demos

- [Actions](https://platform.flatfile.com/getting-started)
- [Data Handling](https://platform.flatfile.com/getting-started)
- [Documents](https://platform.flatfile.com/getting-started)
- [Dynamic Configurations](https://platform.flatfile.com/getting-started)
- [Extractors](https://platform.flatfile.com/getting-started)
- [Namespaces](https://platform.flatfile.com/getting-started)
- [Theming](https://platform.flatfile.com/getting-started)
