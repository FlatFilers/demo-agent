import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import workbookConfig from "../constants/workbook.json";
import { egressDocument } from "../constants/documents.json";

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
            title: "About this egress demo",
            body: egressDocument,
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

          const documentsWorkbook = {
            ...{ Labels: ["Primary", "Egress-Demo"] },
            ...workbookConfig,
          };

          // @ts-ignore
          await api.workbooks.create({
            spaceId,
            environmentId,
            ...documentsWorkbook,
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
