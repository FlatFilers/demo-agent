import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { sidebarDocument } from '../constants/documents.json'
import simpleWorkbook from '../constants/workbook.json'

export default function flatfileEventListener(listener: FlatfileListener) {
  listener.filter({ job: 'space:configure' }, (configure: FlatfileListener) => {
    configure.on('job:ready', async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
      try {
        await api.jobs.ack(jobId, {
          info: 'Job started.',
          progress: 10,
        })

        const { data } = await api.documents.create(spaceId, {
          title: 'About this Sidebar Demo',
          body: sidebarDocument,
        })

        const documentId = data.id
        const spaceUpdateParams = {
          metadata: {
            sidebarConfig: {
              defaultPage: {
                documentId,
              },
              showSidebar: false,
            },
          },
        }

        await api.spaces.update(spaceId, spaceUpdateParams)

        const sidebarWorkbook = {
          ...{ Labels: ['Primary', 'Sidebar-Demo'] },
          ...simpleWorkbook,
        }

        // @ts-ignore
        await api.workbooks.create({
          spaceId,
          environmentId,
          ...sidebarWorkbook,
        })

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
}
