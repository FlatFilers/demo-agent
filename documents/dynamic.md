# Try Dynamic Configuration

---

This Space has been dynamically configured.
The automatic configuration was triggered by passing an **autoConfigure: true** parameter on Space Creation. This triggers the publication of a **space:configure** event that your Listener can receive and act upon.
This Space was dynamically created with the following code.

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
            info: "Starting Job.",
            progress: 10,
          });
          await api.workbooks.create({
            spaceId,
            environmentId,
            name: "All Data",
            labels: ["pinned"],
            sheets: [
              {
                name: "Contacts",
                slug: "contacts",
                fields: [
                  {
                    key: "firstName",
                    type: "string",
                    label: "First Name",
                  },
                  {
                    key: "lastName",
                    type: "string",
                    label: "Last Name",
                  },
                  {
                    key: "email",
                    type: "string",
                    label: "Email",
                  },
                ],
              },
            ],
            actions: [
              {
                operation: "submitActionFg",
                mode: "foreground",
                label: "Submit",
                type: "string",
                description: "Submit Data",
                primary: true,
              },
            ],
          });
          await api.jobs.complete(jobId, {
            outcome: {
              message: "Job completed.",
            },
          });
        } catch (error) {
          console.error("Error: ", error.stack);
          await api.jobs.fail(jobId, {
            outcome: {
              message: "Job encountered an error.",
            },
          });
        }
      }
    );
  });
  listener.filter(
    { job: "workbook:submitActionFg" },
    (configure: FlatfileListener) => {
      configure.on(
        "job:ready",
        async ({ context: { jobId } }: FlatfileEvent) => {
          console.log("My job is running", jobId);
          try {
            await api.jobs.ack(jobId, {
              info: "Starting Job.",
              progress: 10,
            });
            // Custom Code Here
            await api.jobs.complete(jobId, {
              outcome: {
                message: "Job completed.",
              },
            });
          } catch (error) {
            console.error("Error:", error.stack);
            await api.jobs.fail(jobId, {
              outcome: {
                message: "Job encountered an error.",
              },
            });
          }
        }
      );
    }
  );
}
```

## Further Documentation

Read more about dynamic configuration [here](https://flatfile.com/docs/guides/dynamic-configurations).
