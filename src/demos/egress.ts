import api from '@flatfile/api'
import type { Client, FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { egressDocument } from '../constants/documents.json'
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
          title: 'About this Egress Demo',
          body: egressDocument,
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

        const egressWorkbook = {
          ...{ Labels: ['Primary', 'Egress-Demo'] },
          ...simpleWorkbook,
        }

        // @ts-ignore
        await api.workbooks.create({
          spaceId,
          environmentId,
          ...egressWorkbook,
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

  listener.filter({ job: 'workbook:submitActionFg' }, (configure) => {
    configure.on('job:ready', async (event: FlatfileEvent) => {
      const { jobId } = event.context
      try {
        await api.jobs.ack(jobId, {
          info: 'Job started.',
          progress: 10,
        })

        await api.jobs.complete(jobId, {
          outcome: {
            message: `Job "Send Workbook To ACME" completed.`,
          },
        })
      } catch (error) {
        console.error('Error:', (error as unknown as Error).stack)

        await api.jobs.fail(jobId, {
          outcome: {
            message: 'Job encountered an error.',
          },
        })
      }
    })
  })
}
