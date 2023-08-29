# Dynamically build your Spaces as they're created

---

To work with data in Flatfile, you'll first need to create and then configure a Space.

Your business needs will determine how many Spaces you'll need, but you'll likely need more than one.

Dynamic configurations make it easy to create new Spaces that are ready to go with your pre-configured specifications.\
You can even use the context of their creation to configure Spaces differently.

## Making this Space

This very Space was configured Dynamically.

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

          // Add a workbook to this space
          await api.workbooks.create({
            spaceId,
            environmentId,
            name: "All Data",
            sheets: [
              ...
            ],
            actions: [
              {
                operation: "submitAction",
                mode: "foreground",
                label: "Submit",
                type: "string",
                primary: true,
              },
            ],
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
              message: "Job error.",
            },
          });
        }
      }
    );
  });

  listener.filter(
    { job: "workbook:submitAction" },
    (configure: FlatfileListener) => {
      configure.on(
        "job:ready",
        async ({ context: { jobId } }: FlatfileEvent) => {
          try {
            await api.jobs.ack(jobId, {
              info: "Starting Job.",
              progress: 10,
            });

            // Custom code here

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
    }
  );
}
```

Notice that there are two listener configurations here:

- `space:configure`
- `workbook:submitAction`

The `workbook:submitAction` has been configured to respond to the submit action on our Workbook. But the Workbook itself is configured dynamically via the `space:configure` listener.

## Initializing your dynamic configuration

With the above code running on our Agent, we simply create a new space taking care to include the `autoConfigure: true` parameter. This parameter triggers the publication of the `space:configure` event that we're listening for. But you can do far more than adding a Workbook. See our other examples for further possibilities.

## Further documentation

Read more about dynamically building your Spaces [here](https://flatfile.com/docs/guides/dynamic-configurations).

## Learn more about Flatfile by trying our other demos

- [Actions](https://platform.flatfile.com/getting-started)
- [Data Handling](https://platform.flatfile.com/getting-started)
- [Documents](https://platform.flatfile.com/getting-started)
- [Extractors](https://platform.flatfile.com/getting-started)
- [Theming](https://platform.flatfile.com/getting-started)
