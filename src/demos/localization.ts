import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import simpleWorkbook from "../constants/workbook.json";
import { localizationDocument } from "../constants/documents.json";

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

          const { data } = await api.documents.create(spaceId, {
            title: "About this Localization Demo",
            body: localizationDocument,
          });

          await api.spaces.update(spaceId, {
            metadata: {
              sidebarConfig: {
                defaultPage: {
                  documentId: data.id,
                },
              },
            },
            translationsPath: "",
          });

          const localizationWorkbook = {
            ...{ Labels: ["Primary", "Localization-Demo"] },
            ...simpleWorkbook,
          };

          // @ts-ignore
          await api.workbooks.create({
            spaceId,
            environmentId,
            ...localizationWorkbook,
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
}