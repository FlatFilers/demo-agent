# Trigger operations based on user input

---

An Action is a code-based operation that executes upon user interaction.

Actions can be defined at the Blueprint level for a Workbook or Sheet. Files may also have actions, those are dynamically created by your listener upon file upload.

## Making this Space

This Space has been configured with a workbook level action.

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

          await api.workbooks.create({
              spaceId,
              environmentId,
                "name": "All Contacts",
                "sheets": ...
                "actions": [
                    {
                    "operation": "submitAction",
                    "mode": "foreground",
                    "label": "Submit",
                    "type": "string",
                    "description": "Submit Data",
                    "primary": true
                    }
                ]
          });

          await api.jobs.complete(jobId, {
            outcome: {
              message: "Job completed.",
            },
          });
        } catch (error: any) {

          await api.jobs.fail(jobId, {
            outcome: {
              message: "Job error.",
            },
          });
        }
      }
    );
  });

  listener.filter({ job: "workbook:submitAction" }, (configure) => {
    configure.on("job:ready", async (event: FlatfileEvent) => {
      const { jobId } = event.context;
      try {
        await api.jobs.ack(jobId, {
          info: "Job started.",
          progress: 10,
        });

        // Custom code here

        await api.jobs.complete(jobId, {
          outcome: {
            message: `Job "Custom Action" completed.`,
          },
        });
      } catch (error: any) {
        console.error("Error:", error.stack);

        await api.jobs.fail(jobId, {
          outcome: {
            message: "Job encountered an error.",
          },
        });
      }
    });
  });
}
```

## Things you can do here

Notice the `submitAction` operation defined on the Workbook. This action is listened for and responded to below in the `workbook:submitAction` listener.

To see this Action run, navigate to your Workbook and click submit.

## Further documentation

Read more about how to configure actions based on user input [here](https://flatfile.com/docs/guides/actions).

## Learn more about Flatfile by trying our other demos

- [Data Handling](https://platform.flatfile.com/getting-started)
- [Documents](https://platform.flatfile.com/getting-started)
- [Dynamic Configurations](https://platform.flatfile.com/getting-started)
- [Egress](https://platform.flatfile.com/getting-started)
- [Extractors](https://platform.flatfile.com/getting-started)
- [Headless](https://platform.flatfile.com/getting-started)
- [Metadata](https://platform.flatfile.com/getting-started)
- [Namespaces](https://platform.flatfile.com/getting-started)
- [Secrets](https://platform.flatfile.com/getting-started)
- [Sidebar](https://platform.flatfile.com/getting-started)
- [Theming](https://platform.flatfile.com/getting-started)
