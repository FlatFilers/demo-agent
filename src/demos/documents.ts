import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import simpleWorkbook from "../constants/workbook.json";
import {
  documentsDocument1,
  documentsDocument2,
} from "../constants/documents.json";

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
            title: "About this Documents Demo",
            body: documentsDocument1,
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
            body: documentsDocument2,
          });

          const documentsWorkbook = {
            ...{ Labels: ["Primary", "Documents-Demo"] },
            ...simpleWorkbook,
          };

          // @ts-ignore
          await api.workbooks.create({
            spaceId,
            environmentId,
            ...documentsWorkbook,
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
