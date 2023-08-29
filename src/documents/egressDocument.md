# Get your data out of Flatfile

---

Once your data has been imported, transformed, and validated you'll likely want to export that data to a destination.

Sending your data is easy and infinitely customizable via the Flatfile Platform.

## Making this Space

This Space has been configured to run custom Egress code on Submit.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import simpleWorkbook from "../constants/workbook.json";
import { egressDocument } from "../constants/documents.json";

export default function flatfileEventListener(listener: Client) {
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

As you can see this script monitors for a job event called `workbook:submitAction`. When this event is triggered, it retrieves the relevant Sheets and their associated Records from the Workbook.

After that, you can send the data wherever you like.

## Things you can do here

Navigate to your Workbook and click Submit to see how easy it would be to Egress your Workbook.

## Further documentation

Read more about getting your data out of Flatfile [here](https://flatfile.com/docs/guides/egress).

## Learn more about Flatfile by trying our other demos

- [Actions](https://platform.flatfile.com/getting-started)
- [Data Handling](https://platform.flatfile.com/getting-started)
- [Documents](https://platform.flatfile.com/getting-started)
- [Dynamic Configurations](https://platform.flatfile.com/getting-started)
- [Extractors](https://platform.flatfile.com/getting-started)
- [Headless](https://platform.flatfile.com/getting-started)
- [Metadata](https://platform.flatfile.com/getting-started)
- [Namespaces](https://platform.flatfile.com/getting-started)
- [Secrets](https://platform.flatfile.com/getting-started)
- [Sidebar](https://platform.flatfile.com/getting-started)
- [Theming](https://platform.flatfile.com/getting-started)
