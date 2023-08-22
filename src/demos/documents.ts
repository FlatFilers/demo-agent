import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import workbookConfig from "../constants/workbook.json";
import { documents1, documents2 } from "../constants/documents.json";

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

          const { data } = await api.documents.create(spaceId, {
            title: "About this Documents Demo",
            body: documents1,
          });

          const documentId = data.id;
          const spaceUpdateParams = {
            metadata: {
              sidebarConfig: {
                defaultPage: {
                  documentId,
                },
              },
            },
          };

          await api.spaces.update(spaceId, spaceUpdateParams);

          await api.documents.create(spaceId, {
            title: "Configure multiple Documents",
            body: documents2,
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
}
