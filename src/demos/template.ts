import api from "@flatfile/api"
import { FlatfileEvent, FlatfileListener } from "@flatfile/listener"
import { configureSpace } from "@flatfile/plugin-space-configure"
import { templateDocument } from "../constants/documents.json"
import simpleWorkbook from "../constants/workbook.json"

export default function flatfileEventListener(listener: FlatfileListener) {
  listener.use(
    configureSpace(
      {
        workbooks: [
          //@ts-ignore
          {
            ...{ Labels: ["Primary", "Template-Demo"] },
            ...simpleWorkbook,
          },
        ],
      },

      async (event: FlatfileEvent, workbookIds: [], tick: any) => {
        const { spaceId } = event.context

        // Add document to space
        const { data } = await api.documents.create(spaceId, {
          title: "About this Demo",
          body: templateDocument,
        })
        await tick(80, "Document Created")

        // Make document the default page
        const documentId = data.id
        const spaceUpdateParams = {
          metadata: {
            sidebarConfig: {
              defaultPage: {
                documentId,
              },
            },
          },
        }
        await api.spaces.update(spaceId, spaceUpdateParams)
        await tick(90, "Document Pinned")
      }
    )
  )
}
