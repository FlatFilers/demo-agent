import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { actionsDocument } from '../constants/documents.json'
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
          title: 'About this Actions Demo ',
          body: actionsDocument,
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

        const actionsWorkbook = {
          ...{ Labels: ['Primary', 'Actions-Demo'] },
          ...simpleWorkbook,
        }

        // @ts-ignore
        await api.workbooks.create({
          spaceId,
          environmentId,
          ...actionsWorkbook,
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
            message: `Job "Custom Action" completed.`,
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
