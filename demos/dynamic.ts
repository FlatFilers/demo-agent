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
            title: "About this Dynamic Demo",
            body: `# Try Dynamic Configuration\n\n---\n\nTo work with data in Flatfile, you'll first need to create and then configure a Space.\n\nYour business needs will determine how many Spaces you'll need, but it's likely you'll need more one.\n\nDynamic configurations make it easy create new Spaces that are ready to go with your pre-configured specifications.\n\n## Making this space\n\nThis very Space was configured Dynamically.\n\nHere's a look at the code that was used to create it:\n\n\`\`\`jsx\nimport api from "@flatfile/api";\nimport { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";\n\nexport default function flatfileEventListener(listener: Client) {\n  listener.filter({ job: "space:configure" }, (configure: FlatfileListener) => {\n    configure.on(\n      "job:ready",\n      async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {\n        try {\n          await api.jobs.ack(jobId, {\n            info: "Job started.",\n            progress: 10,\n          });\n          await api.workbooks.create({\n            spaceId,\n            environmentId,\n            name: "All Data",\n            sheets: [\n              ...\n            ],\n            actions: [\n              {\n                operation: "submitAction",\n                mode: "foreground",\n                label: "Submit",\n                type: "string",\n                primary: true,\n              },\n            ],\n          });\n          await api.jobs.complete(jobId, {\n            outcome: {\n              message: "Job completed.",\n            },\n          });\n        } catch (error) {\n          await api.jobs.fail(jobId, {\n            outcome: {\n              message: "Job error.",\n            },\n          });\n        }\n      }\n    );\n  });\n  listener.filter(\n    { job: "workbook:submitAction" },\n    (configure: FlatfileListener) => {\n      configure.on(\n        "job:ready",\n        async ({ context: { jobId } }: FlatfileEvent) => {\n          try {\n            await api.jobs.ack(jobId, {\n              info: "Starting Job.",\n              progress: 10,\n            });\n\n          // Custom Code Here\n\n            await api.jobs.complete(jobId, {\n              outcome: {\n                message: "Job completed.",\n              },\n            });\n          } catch (error) {\n            await api.jobs.fail(jobId, {\n              outcome: {\n                message: "Job encountered an error.",\n              },\n            });\n          }\n        }\n      );\n    }\n  );\n}\n\`\`\`\`\n\nNotice that there are two listener configurations here:\n\n- \`space:configure\`\n- \`workbook:submitAction\`\n\nThe \`workbook:submitAction\` has been configured to respond to the submit action on our Workbook. But the Workbook itself is configured dynamically via the \`space:configure\` listener.\n\n## Create a space\n\nWith the above code running on our Agent, we simply create a new space taking care to include the \`autoConfigure: true\` parameter. This parameter triggers the publication of the \`space:configure\` event that we're listening for. But you can do far more that simply creating a Workbook. See our other examples for further possibilities.\n\n## Further documentation\n\nRead more about dynamic configuration [here](https://flatfile.com/docs/guides/dynamic-configurations).\n\n## Additional examples\n\n- [Documents Example](https://platform.flatfile.com/examples)\n- [Extractors Example](https://platform.flatfile.com/examples)\n- [Simple Example](https://platform.flatfile.com/examples)\n- [Theming Example](https://platform.flatfile.com/examples)\n`,
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
