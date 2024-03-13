import api from "@flatfile/api"
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener"
import simpleWorkbook from "../constants/workbook.json"
import { secretsDocument } from "../constants/documents.json"
import { configureSpace } from "@flatfile/plugin-space-configure"

export default function flatfileEventListener(listener: FlatfileListener) {
  const secretsWorkbook = {
    ...{ Labels: ["Primary", "Secrets-Demo"] },
    ...simpleWorkbook,
  }

  listener.use(
    configureSpace(
      // @ts-ignore
      { workbooks: [secretsWorkbook]},
      
      async (event: FlatfileEvent, workbookIds: [], tick: any) => {
        const { spaceId , environmentId} = event.context
       
        // Create document
        const { data } = await api.documents.create(spaceId, {
          title: "About this Secrets Demo",
          body: secretsDocument,
        })
        await tick(60, "Document created")
        const documentId = data.id
        const spaceUpdateParams = {
          metadata: {
            sidebarConfig: {
              defaultPage: {
                documentId,
              },
            },
          },
        };
        await api.spaces.update(spaceId, spaceUpdateParams)
        await tick(80, "Space updated")

        // Create secret
        await api.secrets.upsert({
          environmentId,
          spaceId,
          name: "My First Secret",
          value: "My Super Secret Value",
        })
        await tick(90, "Secret created")

      }
    )
  )
}
