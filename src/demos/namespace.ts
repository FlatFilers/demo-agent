import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { namespaceDocument } from '../constants/documents.json'
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
          title: 'About this Namespace Demo',
          body: namespaceDocument,
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

        const namespaceWorkbook = {
          ...{ Labels: ['Primary', 'Namespace-Demo'] },
          ...simpleWorkbook,
        }

        // @ts-ignore
        await api.workbooks.create({
          spaceId,
          environmentId,
          ...namespaceWorkbook,
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
