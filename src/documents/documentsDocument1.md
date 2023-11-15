# Build pages in your sidebar with Documents

---

Documents are ways of storing information right inside your Space. Provide guidance or reference for your customers without leaving Flatfile.

## Making this Space

This Space has been configured with multiple documents upon creation.

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
          // Acknowledge the space:configure job:ready event was received
          await api.jobs.ack(jobId, {
            info: "Job started.",
            progress: 10,
          });

          // Add first document
          await api.documents.create(spaceId, {
            title: "About this Documents Demo",
            body: "Document text here.",
          });

          // Add another document
          await api.documents.create(spaceId, {
            title: "Configure multiple Documents",
            body: "Document text here.",
          });

          // Notify the space:configure job has been completed
          await api.jobs.complete(jobId, {
            outcome: {
              message: "Job completed.",
            },
          });
        } catch (error) {
          await api.jobs.fail(jobId, {
            outcome: {
              message: "Job encountered an error.",
            },
          });
        }
      }
    );
  });
}
```

## Further documentation

Read more about building pages in your sidebar <a href="https://flatfile.com/docs/guides/documents" target="_blank">here</a>.

## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
