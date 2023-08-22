import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";

import { DelimiterExtractor } from "@flatfile/plugin-delimiter-extractor";
import { JSONExtractor } from "@flatfile/plugin-json-extractor";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { XMLExtractor } from "@flatfile/plugin-xml-extractor";
import { ZipExtractor } from "@flatfile/plugin-zip-extractor";

import workbookConfig from "../constants/workbook.json";
import { extractors } from "../constants/documents.json";

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
            title: "About this Extractor Demo",
            body: extractors,
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

  listener.use(JSONExtractor());
  listener.use(ExcelExtractor());
  listener.use(XMLExtractor());
  listener.use(DelimiterExtractor("txt", { delimiter: "~" }));
  listener.use(ZipExtractor());
}
