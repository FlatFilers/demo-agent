# Get your data out of Flatfile

---

Once your data has been imported, transformed, and validated you'll likely want to export that data to a destination.

Sending your data is easy and infinitely customizable via the Flatfile Platform.

## Things you can do here

Navigate to your Workbook and click Submit to see how easy it would be to Egress your Workbook.

## Making this Space

This Space has been configured to run custom Egress code on Submit.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import simpleWorkbook from "../constants/workbook.json";
import { egressDocument } from "../constants/documents.json";

export default function flatfileEventListener(listener: FlatfileListener) {
   listener.filter({ job: "workbook:submitAction" }, (configure) => {
    configure.on("job:ready", async (event: FlatfileEvent) => {
      const { jobId } = event.context;
      try {
        await api.jobs.ack(jobId, {
          info: "Job started.",
          progress: 10,
        });

        const { data } = await api.sheets.list({ workbookId });

        const records = await Promise.all(data.map(async (element, index) => {
            const record = await api.records.get(element.id);
            return { [`Sheet[${index}]`]: record };
        }));

        // Custom code exporting records here

        await api.jobs.complete(jobId, {
          outcome: {
            message: `Job "Send Workbook To ACME" completed.`,
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

As you can see this script monitors for a job event called `workbook:submitAction`. When this event is triggered, it retrieves the relevant Sheets and their associated Records from the Workbook.

After that, you can send the data wherever you like.

## Further documentation

Read more about getting your data out of Flatfile <a href="https://flatfile.com/docs/guides/egress" target="_blank">here</a>.

## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
