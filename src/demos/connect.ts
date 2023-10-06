import api from "@flatfile/api";
import { FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import mergePlugin from "@flatfile/plugin-connect-via-merge";
import { configureSpace } from "@flatfile/plugin-space-configure";
import { dataDocument } from "../constants/documents.json";
import simpleWorkbook from "../constants/workbook.json";

export default function flatfileEventListener(listener: FlatfileListener) {
  listener.use(
    configureSpace(
      {
        workbooks: [
          //@ts-ignore
          {
            ...{ Labels: ["Primary", "Connect-Demo"] },
            ...simpleWorkbook,
          },
        ],
      },
      async (event: FlatfileEvent, workbookIds: [], tick: any) => {
        const { spaceId } = event.context;
        const { data } = await api.documents.create(spaceId, {
          title: "About this Connect via Merge.dev Demo",
          body: dataDocument,
        });
        await tick(80, "Document created");
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
        await tick(90, "Space updated");
      }
    )
  );

  listener.use(mergePlugin());
}
