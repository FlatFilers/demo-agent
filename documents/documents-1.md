# About this Documents Demo

---

Documents are ways of storing information right inside your Space. Provide guidance or reference for your customers without leaving Flatfile.

## Making this space

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
          await api.jobs.ack(jobId, {
            info: "Job started.",
            progress: 10,
          });
          await api.documents.create(spaceId, {
            title: "About this Documents Demo",
            body: "Document text here.",
          });
          await api.documents.create(spaceId, {
            title: "Configure multiple Documents",
            body: "Document text here.",
          });
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
