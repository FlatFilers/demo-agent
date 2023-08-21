import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import { FlatfileRecord, recordHook } from "@flatfile/plugin-record-hook";
import axios from "axios";

import { workbookConfig } from "../helpers";

export default function flatfileEventListener(listener: Client) {
  listener.filter({ job: "space:configure" }, (configure: FlatfileListener) => {
    configure.on(
      "job:ready",
      async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
        try {
          await api.jobs.ack(jobId, {
            info: `Starting Job: ${jobId}`,
            progress: 10,
          });

          await api.documents.create(spaceId, {
            title: "Simple Demo",
            body: `# About this Simple Demo\n\n---\n\nWelcome, to Flatfile.\n\nThis is Basic Space, configured to as an interactive tour to show you around.\n\nLet's begin by first getting acquainted with what you're seeing here in the sidebar.\n\n## Data Checklist\n\nUse the Data Checklist to learn the data that will be expected in the Simple Workbook.\n\n## Files\n\nUse the Files screen to upload files. You can also upload them directly into Sheets.\n\n## Collaborators\n\nInvite a Guest to this Space. Their view will look a little different than yours. Try an alias email to see.\n\n## Simple Workbook\n\nThe Simple Workbook contains two Sheets: **Contacts**, and **Countries**.\n\n#### Things you can do here:\n\n1. You can upload/download CSV files files into and from each Sheet.\n2. You can manually add records to each Sheet directly in the UI.\n3. You can also manually adjust cells & records individually, or in bulk.\n\n#### 1. Contacts (Sheet)\n\nThe **Contacts** Sheet is a very simple Sheet with one reference field, **Country**. It also has a few data validations.\n\n#### 2. Countries (Sheet)\n\nThe **Countries** Sheet is where you’ll add all of the countries you want to display in the dropdown menu in the first Sheet.\n\n## Additional Examples\n\n- [Documents Example](https://platform.flatfile.com/examples)\n- [Dynamic Example](https://platform.flatfile.com/examples)\n- [Extractors Example](https://platform.flatfile.com/examples)\n- [Theming Example](https://platform.flatfile.com/examples)\n`,
          });

          // @ts-ignore
          await api.workbooks.create({
            spaceId,
            environmentId,
            ...workbookConfig,
          });

          await api.jobs.complete(jobId, {
            outcome: {
              message: `Job ${jobId} completed.`,
            },
          });
        } catch (error: any) {
          console.error("Error: ", error.stack);

          await api.jobs.fail(jobId, {
            outcome: {
              message: `Job ${jobId} encountered an error.`,
            },
          });
        }
      }
    );
  });

  listener.use(
    recordHook("contacts", (record: FlatfileRecord) => {
      const value = record.get("firstName");
      if (typeof value === "string") {
        record.set("firstName", value.toLowerCase());
      }

      const email = record.get("email") as string;
      const validEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validEmailAddress.test(email)) {
        console.log("Invalid email address");
        record.addError("email", "Invalid email address");
      }

      return record;
    })
  );

  listener.filter({ job: "workbook:submitAction" }, (configure) => {
    configure.on(
      "job:ready",
      async ({ context: { jobId, workbookId }, payload }: FlatfileEvent) => {
        const { data: sheets } = await api.sheets.list({ workbookId });

        const records: { [name: string]: any } = {};
        for (const [index, element] of sheets.entries()) {
          records[`Sheet[${index}]`] = await api.records.get(element.id);
        }

        try {
          const webhookReceiver =
            "https://webhook.site/c83648d4-bf0c-4bb1-acb7-9c170dad4388";

          await api.jobs.ack(jobId, {
            info: `Starting Job: ${jobId}, submitting to ${webhookReceiver}`,
            progress: 10,
          });

          console.log(JSON.stringify(records, null, 2));

          const response = await axios.post(
            webhookReceiver,
            {
              ...payload,
              method: "axios",
              sheets,
              records,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            await api.jobs.complete(jobId, {
              outcome: {
                message: `Data was successfully submitted to ${webhookReceiver}.`,
              },
            });
          } else {
            throw new Error(`Failed to submit data to ${webhookReceiver}.`);
          }
        } catch (error: any) {
          console.log(`webhook.site[error]: ${JSON.stringify(error, null, 2)}`);

          await api.jobs.fail(jobId, {
            outcome: {
              message: `Job ${jobId} encountered an error. It likely could not find the webhook.site URL.`,
            },
          });
        }
      }
    );
  });
}
