import api from '@flatfile/api'
import type { Client, FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import {
  documentsDocument1,
  documentsDocument2,
  documentsDocument3,
  documentsDocument4,
} from '../constants/documents.json'
import simpleWorkbook from '../constants/workbook.json'

export default function flatfileEventListener(listener: Client) {
  listener.filter({ job: 'space:configure' }, (configure: FlatfileListener) => {
    configure.on('job:ready', async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
      try {
        await api.jobs.ack(jobId, {
          info: 'Job started.',
          progress: 10,
        })

        const { data } = await api.documents.create(spaceId, {
          title: 'About this Documents Demo',
          body: documentsDocument1,
        })

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

        const documentsWorkbook = {
          ...{ Labels: ['Primary', 'Documents-Demo'] },
          ...simpleWorkbook,
        }

        // @ts-ignore
        const workbookResponse = await api.workbooks.create({
          spaceId,
          environmentId,
          ...documentsWorkbook,
        })

        await api.documents.create(spaceId, {
          title: 'Configure multiple Documents',
          body: documentsDocument2,
        })

        await api.documents.create(spaceId, {
          title: 'Document Actions',
          body: documentsDocument3,
          actions: [
            {
              label: 'Submit',
              operation: 'contacts:submit',
              description: 'Would you like to submit the contact data?',
              tooltip: 'Submit the contact data',
              mode: 'foreground',
              primary: true,
              confirm: true,
            },
          ],
        })

        const ephemeralDocument = await api.documents.create(spaceId, {
          title: 'Ephemeral Document example',
          body: documentsDocument4,
          treatments: ['ephemeral'],
        })

        await api.documents.create(spaceId, {
          title: 'Ephemeral Documents',
          body: `# Ephemeral Documents\n\nEphemeral Documents are stand-alone pages that provide a more focused, guided experience for your end users. The main differences between ephemeral Documents and normal Documents are that ephemeral documents are full-screen takeovers, and they do not appear in the sidebar.\n\n[Click here](/space/${spaceId}/document/${ephemeralDocument.data.id}) to see an example of an ephemeral Document.\n\nCreate ephemeral documents using the \`treatments\` parameter when creating a Document, and give your document a treatment of "ephemeral".\n\n\`\`\`ts\nconst ephemeralDoc = await api.documents.create(spaceId, {\n  title: \"Ephemeral Documents\",\n  body: bodyText,\n  treatments: [\"ephemeral\"],\n});\n\`\`\`\n\n[Learn more about creating ephemeral Documents in our guides](https://flatfile.com/docs/guides/documents#document-treatments).`,
        })

        const workbookId = workbookResponse.data.id
        const sheetsResponse = workbookResponse.data.sheets
        const sheetId = sheetsResponse?.[0]?.id
        const sheetName = simpleWorkbook.sheets[0].name

        if (sheetId && workbookId) {
          await api.documents.create(spaceId, {
            title: 'Embedded Sheets in Documents',
            body: `# Embedding Sheets in Documents\n\nYou can embed Sheets directly into Documents to allow your users to view and edit Sheet data live:\n\n\`\`\`ts\nconst doc = await api.documents.create(spaceId, {\n  title: \"Embedding Sheets in Documents\",\n  body: \`\n    # Embedding Sheets in Documents\n    \n    You can embed Sheets directly into Documents to allow your users to view and edit Sheet data live:\n    \n    <embed type='embedded-sheet' name='Contacts' defaultExpanded='true' sheetId='your_sheet_id' workbookId='your_workbook_id'>\n  \`,\n});\n\`\`\`\n\n\n<embed type='embedded-sheet' workbookId='${workbookId}' sheetId='${sheetId}' name='${sheetName}' defaultExpanded="true">\n\n[Learn more about embedding Sheets into Documents in our guides](https://flatfile.com/docs/guides/documents#embedding-sheets-in-documents).`,
          })
        }

        await api.jobs.complete(jobId, {
          outcome: {
            message: 'Job completed.',
          },
        })
      } catch (error) {
        console.error('Error: ', (error as unknown as Error).stack)

        await api.jobs.fail(jobId, {
          outcome: {
            message: 'Job error.',
          },
        })
      }
    })
  })

  listener.on('job:ready', { job: 'document:contacts:submit' }, async (event) => {
    const { context, payload } = event
    const { jobId, workbookId } = context

    try {
      await api.jobs.ack(jobId, {
        info: 'Starting submit job...',
        progress: 10,
      })

      // Do your work here

      await api.jobs.complete(jobId, {
        outcome: {
          message: 'Submit job was completed succesfully.',
        },
      })
    } catch (error) {
      console.log(`There was an error: ${JSON.stringify(error)}`)
      await api.jobs.fail(jobId, {
        outcome: {
          message: 'This job failed.',
        },
      })
    }
  })
}
