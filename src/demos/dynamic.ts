import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import workbookConfig from "../constants/workbook.json";
import { dynamic } from "../constants/documents.json";

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
            title: "About this Dynamic Demo",
            body: dynamic,
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

  listener.filter(
    { job: "workbook:submitActionFg" },
    (configure: FlatfileListener) => {
      configure.on(
        "job:ready",
        async ({ context: { jobId } }: FlatfileEvent) => {
          console.log("My job is running", jobId);
          try {
            await api.jobs.ack(jobId, {
              info: `Starting Job: ${jobId}`,
              progress: 10,
            });

            // Custom Code Here

            await api.jobs.complete(jobId, {
              outcome: {
                message: `Job ${jobId} completed.`,
              },
            });
          } catch (error: any) {
            console.error("Error:", error.stack);

            await api.jobs.fail(jobId, {
              outcome: {
                message: `Job ${jobId} encountered an error.`,
              },
            });
          }
        }
      );
    }
  );
}