import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { type FlatfileRecord, recordHook } from '@flatfile/plugin-record-hook'
import { dataDocument } from '../constants/documents.json'
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
          title: 'About this Data Handling Demo',
          body: dataDocument,
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

        const dataWorkbook = {
          ...{ Labels: ['Primary', 'Data-Demo'] },
          ...simpleWorkbook,
        }

        // @ts-ignore
        await api.workbooks.create({
          spaceId,
          environmentId,
          ...dataWorkbook,
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

  listener.use(
    recordHook('contacts', (record: FlatfileRecord) => {
      record.compute(
        'email',
        (email, record) =>
          `${record.get('first_name')?.toString().toLowerCase()}${record
            .get('last_name')
            ?.toString()
            .toLowerCase()}@gmail.com`,
        'Email was generated from first and last name.',
      )

      record.computeIfPresent(
        'email',
        (email) => email?.toString() || ''.toLowerCase(),
        'Email was converted to lowercase.',
      )

      record.validate(
        'last_name',
        (value) => typeof value === 'string' && !/\d/.test(value),
        'Last name cannot contain numbers.',
      )
      return record
    }),
  )
}
