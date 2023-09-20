# Deliver a completely automated data import experience

---

With Flatfile’s headless data import capabilities, you can seamlessly integrate an adaptable data connection into your system.

You can achieve a fully automated data exchange between systems in just three steps: `ingress`, `processing`, `egress`.

## Making this Space

This Space has been configured to run as a Headless workflow.

Here's a look at the code that was used to create it:

```jsx
  listener.filter({ job: "space:configure" }, (configure: FlatfileListener) => {
    configure.on(
      "job:ready",
      async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
        try {
          await api.jobs.ack(jobId, {
            info: "Job started.",
            progress: 10,
          });

          // Create a workbook when the space is configured
          await api.workbooks.create({
            spaceId,
            environmentId,
            ...
          });

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

  // We expect Excel data, and use our plugin to extract it.
  listener.use(ExcelExtractor({ rawNumbers: true }));
  // Use automap to map the data into our Workbook
  listener.use(
    automap({
      accuracy: "confident",
      defaultTargetSheet: "Inventory",
      matchFilename: /^.*inventory\.xlsx$/,
      onFailure: console.error,
    })
  );

  // Use RecordHooks to transform and validate our data
  listener.use(
    recordHook("inventory", async (record, event) => {
      const author = record.get("author");
      function validateNameFormat(name: string) {
        const pattern: RegExp = /^\s*[\p{L}'-]+\s*,\s*[\p{L}'-]+\s*$/u;
        return pattern.test(name);
      }

      if (!validateNameFormat(author as string)) {
        const nameSplit = (author as string).split(" ");
        record.set("author", `${nameSplit[1]}, ${nameSplit[0]}`);
        record.addComment("author", "Author name was updated for vendor");
        return record;
      }
    })
  );

  // Listen for our workbook:map event to be completed forwarding data
  listener.filter({ job: "workbook:map" }, (configure) => {
    configure.on("job:completed", async (event: FlatfileEvent) => {

      // Get our data as a CSV
      const { data } = await api.workbooks.get(event.context.workbookId);
      const orderSheet = data.sheets[1].id;
      const csv = await api.sheets.getRecordsAsCsv(orderSheet);

      // Custom egress code here
    });
  });
```

## Things you can do here

In a Headless use case, you a user would only use the UI if an automation needed some advice on how to proceed.

This Space has been configured to automatically automatically process and show where your custom code may egress, but you'll need to mimic ingress.

You can do that by importing [this inventory file](https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/typescript/headless/inventory.xlsx).

Watch all of the processing happen without further human intervention!

## Further documentation

Read more about configuring a completely automated data import experience [here](https://flatfile.com/docs/guides/use-cases/headless).

## Learn more about Flatfile by trying our [other demos](https://platform.flatfile.com/getting-started)
