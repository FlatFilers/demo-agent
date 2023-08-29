import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import sidebarWorkbook from "../constants/sidebarWorkbook.json";
import theme from "../constants/theme.json";
import sidebarThemes from "../constants/sidebarThemes.json";
import { themingDocument } from "../constants/documents.json";

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
            title: "About this Theming Demo",
            body: themingDocument,
          });

          const documentId = data.id;
          const themeConfig: any = theme;
          themeConfig.metadata.sidebarConfig = {
            ...themeConfig.metadata.sidebarConfig,
            defaultPage: { documentId },
          };

          await api.spaces.update(spaceId, {
            environmentId,
            ...themeConfig,
          });

          const themingWorkbook = {
            ...{ Labels: ["Primary", "Theming-Demo"] },
            ...sidebarWorkbook,
          };

          // @ts-ignore
          const workbookData = await api.workbooks.create({
            spaceId,
            environmentId,
            ...themingWorkbook,
          });

          // @ts-ignore
          const sheetId = workbookData.data.sheets[0].id;

          api.records.insert(sheetId, sidebarThemes);

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

  listener.filter({ job: "sheet:update-theme" }, (configure) => {
    configure.on("job:ready", async (event: FlatfileEvent) => {
      const { jobId, spaceId } = event.context;
      try {
        await api.jobs.ack(jobId, {
          info: "Job started.",
          progress: 10,
        });

        function removeDuplicateSlashes(url: string): string {
          return url.replace(/\/{2,}/g, "/");
        }

        const url = removeDuplicateSlashes(
          `${event._apiUrl}/${event.src.dataUrl}`
        );

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${event._accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from ${url}: ${response.statusText}`
          );
        }

        const { data } = await response.json();
        const themeSelection = data.records[0].values;

        function getTheme(input: any) {
          const theme: any = {};

          for (const key in input) {
            if (key !== "themeName") {
              theme[key] = input[key].value;
            }
          }

          return theme;
        }

        const theme = getTheme(themeSelection);
        const spaceUpdateParams = {
          metadata: {
            theme: {
              sidebar: {
                ...theme,
              },
            },
          },
        };

        await api.spaces.update(spaceId, spaceUpdateParams);

        await api.jobs.complete(jobId, {
          outcome: {
            message: `Job "Update Theme" completed.`,
          },
        });
      } catch (error: any) {
        console.error("Error:", error.stack);

        await api.jobs.fail(jobId, {
          outcome: {
            message: "Job encountered an error.",
          },
        });
      }
    });
  });
}
