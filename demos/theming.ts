import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import { workbookConfig, themeConfig } from "../helpers";

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
            title: "About this Theming Demo",
            body: `# Try Theming\n\n---\n\nAll Spaces are customizable via theming options enabling you to blend Flatfile seamlessly into your application.\n\n## Making this space\n\nThis Space has been configured to leverage the visual overrides available to help you theme a Space. We've customized the colors and logo in this Space to match a sample brand but you can very easily update all of the elements you see to a different aesthetic to match yours. Even better? Create co-branded experiences in all of your Spaces for every one of your customers.\n\nHere's a look at the code that was used to create it:\n\n\`\`\`jsx\nimport api from "@flatfile/api";\nimport { Client, FlatfileEvent } from "@flatfile/listener";\n\nexport default function flatfileEventListener(listener: Client) {\n  listener.on(\n    "space:created",\n    async ({ context: { spaceId, environmentId } }: FlatfileEvent) => {\n      await api.spaces.update(spaceId, {\n        environmentId,\n        metadata: {\n          theme: {\n            root: {\n              primaryColor: "#090B2B",\n              dangerColor: "#F44336",\n              warningColor: "#FF9800",\n            },\n            document: {\n              borderColor: "#CAD0DC",\n            },\n            sidebar: {\n              logo: "path/to/logo/file",\n              textColor: "#ECEEFF",\n              titleColor: "#C4C9FF",\n              focusBgColor: "#6673FF",\n              focusTextColor: "#FFF",\n              backgroundColor: "#090B2B",\n              footerTextColor: "#C4C9FF",\n              textUltralightColor: "#B9DDFF",\n              borderColor: "#2E3168",\n              activeTextColor: "#FFF",\n            },\n            table: {},\n          },\n          sidebarConfig: {\n            showGuestInvite: true,\n            showDataChecklist: true,\n            showSidebar: true,\n          },\n        },\n      });\n    }\n  );\n}\n\`\`\`\`\n\n## Further documentation\n\nRead more about the possible configurations for theming [here](https://flatfile.com/docs/guides/theming).\n\n## Additional examples\n\n- [Documents Example](https://platform.flatfile.com/examples)\n- [Dynamic Example](https://platform.flatfile.com/examples)\n- [Extractors Example](https://platform.flatfile.com/examples)\n- [Theming Example](https://platform.flatfile.com/examples)\n`,
          });

          // @ts-ignore
          await api.workbooks.create({
            spaceId,
            environmentId,
            ...workbookConfig,
          });

          await api.spaces.update(spaceId, {
            environmentId,
            ...themeConfig,
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
