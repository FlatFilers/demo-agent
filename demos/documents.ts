import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
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
            title: "About this Documents Demo",
            body: `# About this Documents Demo\n\n---\n\nDocuments are ways of storing information right inside your Space. Provide guidance or reference for your customers without leaving Flatfile.\n\n## Making this space\n\nThis Space has been configured with multiple documents upon creation.\n\nHere's a look at the code that was used to create it:\n\n\`\`\`jsx\nimport api from "@flatfile/api";\nimport { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";\nexport default function flatfileEventListener(listener: Client) {\n  listener.filter({ job: "space:configure" }, (configure: FlatfileListener) => {\n    configure.on(\n      "job:ready",\n      async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {\n        try {\n          await api.jobs.ack(jobId, {\n            info: "Job started.",\n            progress: 10,\n          });\n          await api.documents.create(spaceId, {\n            title: "About this Documents Demo",\n            body: "Document text here.",\n          });\n          await api.documents.create(spaceId, {\n            title: "Configure multiple Documents",\n            body: "Document text here.",\n          });\n          await api.jobs.complete(jobId, {\n            outcome: {\n              message: "Job completed.",\n            },\n          });\n        } catch (error) {\n          await api.jobs.fail(jobId, {\n            outcome: {\n              message: "Job encountered an error.",\n            },\n          });\n        }\n      }\n    );\n  });\n}\n\`\`\`\`\n`,
          });

          await api.documents.create(spaceId, {
            title: "Configure multiple Documents",
            body: `# Configure multiple Document\n\n---\n\nAs this example demonstrates, you many create as many Documents are you need.\n\n## Further documentation\n\nRead more about Documents [here](https://flatfile.com/docs/guides/documents).\n\n## Additional examples\n\n- [Dynamic Example](https://platform.flatfile.com/examples)\n- [Extractors Example](https://platform.flatfile.com/examples)\n- [Simple Example](https://platform.flatfile.com/examples)\n- [Theming Example](https://platform.flatfile.com/examples)\n`,
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
