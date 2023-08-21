import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";

import { DelimiterExtractor } from "@flatfile/plugin-delimiter-extractor";
import { JSONExtractor } from "@flatfile/plugin-json-extractor";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { XMLExtractor } from "@flatfile/plugin-xml-extractor";
import { ZipExtractor } from "@flatfile/plugin-zip-extractor";

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
            title: "About this Extractor Demo",
            body: `# Try Auto-Extraction\n\n---\n\nThe Flatfile Platform is a powerful tool for working with your Data. But first your data has to be available to work with. Making existing data available in Flatfile is simple: upload, extract, map.\n\nExtraction is the process of extracting data from it's original format to the Flatfile Platform. Whether your incoming data is \`.json\`, \`.xlsx\`, \`.zip\` or a multitude of others extraction can be automated via the use Plugins. Simply configure your Listener to use one or more extractor plugins and extraction will be handled automatically upon file upload.\n\n## Making this space\n\nThis Space has been configured to use several extractor plugins.\n\nHere's a look at the code that was used to create it:\n\n\`\`\`jsx\nimport { Client, FlatfileListener } from "@flatfile/listener";\n\nimport { DelimiterExtractor } from "@flatfile/plugin-delimiter-extractor";\nimport { JSONExtractor } from "@flatfile/plugin-json-extractor";\nimport { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";\nimport { XMLExtractor } from "@flatfile/plugin-xml-extractor";\nimport { ZipExtractor } from "@flatfile/plugin-zip-extractor";\n\nexport default function flatfileEventListener(listener: Client) {\n  listener.use(JSONExtractor());\n  listener.use(ExcelExtractor());\n  listener.use(XMLExtractor());\n  listener.use(DelimiterExtractor("txt", { delimiter: "~" }));\n  listener.use(ZipExtractor());\n}\n\`\`\`\`\n\nTo see them work, simply upload a supported file.\n\nThey appropriate plugin will extract data automatically. Once extraction is complete, you can import and map your data into a workbook and it's ready for use.\n\n## Further documentation\n\nRead more about the possible configurations for each plugin [here](https://flatfile.com/docs/plugins/extractors/).\n\n## Additional examples\n\n- [Documents Example](https://platform.flatfile.com/examples)\n- [Dynamic Example](https://platform.flatfile.com/examples)\n- [Simple Example](https://platform.flatfile.com/examples)\n- [Theming Example](https://platform.flatfile.com/examples)\n`,
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

  listener.use(JSONExtractor());
  listener.use(ExcelExtractor());
  listener.use(XMLExtractor());
  listener.use(DelimiterExtractor("txt", { delimiter: "~" }));
  listener.use(ZipExtractor());
}
