import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import { FlatfileRecord, recordHook } from "@flatfile/plugin-record-hook";
import axios from "axios";

import workbookConfig from "../constants/workbook.json";
import { simple } from "../constants/documents.json";

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
            body: simple,
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