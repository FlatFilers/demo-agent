# Trigger operations based on user input

---

An Action is a code-based operation that executes upon user interaction.

Actions can be defined in your Workbook or Sheet Blueprint. Files may also have actions, but as files have no Blueprints these are configured dynamically by your code upon file upload.

## Things you can do here

Notice the `submitAction` operation defined on the Workbook. This action is listened for and responded to below in the `workbook:submitAction` listener.

To see this Action run navigate to the Contacts Workbook and click `Submit`.

## Making this Space

This Space has been configured with a Workbook level action.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { FlatfileEvent, FlatfileListener } from "@flatfile/listener";

export default function flatfileEventListener(listener: FlatfileListener) {
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
      } catch (error) {
        console.error("Error:", (error as unknown as Error).stack);

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

## Further documentation

Read more about how to configure actions based on user input <a href="https://flatfile.com/docs/guides/actions" target="_blank">here</a>.

## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
