import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { JSONExtractor } from '@flatfile/plugin-json-extractor'
import { type FlatfileRecord, recordHook } from '@flatfile/plugin-record-hook'
import { ExcelExtractor } from '@flatfile/plugin-xlsx-extractor'
import { XMLExtractor } from '@flatfile/plugin-xml-extractor'
import { ZipExtractor } from '@flatfile/plugin-zip-extractor'

import type { Flatfile } from '@flatfile/api'
import { simpleDocument } from '../constants/documents.json'
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
          title: 'About this Demo',
          body: simpleDocument,
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

        const workbook = {
          ...{ Labels: ['Primary', 'Simple-Demo'] },
          ...simpleWorkbook,
        }

        // @ts-ignore
        await api.workbooks.create({
          spaceId,
          environmentId,
          ...workbook,
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
      const value = record.get('firstName')
      if (typeof value === 'string') {
        record.set('firstName', value.toLowerCase())
      }

      const email = record.get('email') as string
      const validEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!validEmailAddress.test(email)) {
        console.log('Invalid email address')
        record.addError('email', 'Invalid email address')
      }

      return record
    }),
  )

  listener.filter({ job: 'workbook:submitAction' }, (configure) => {
    configure.on('job:ready', async ({ context: { jobId, workbookId }, payload }: FlatfileEvent) => {
      const { data: sheets } = await api.sheets.list({ workbookId })

      const records: { [name: string]: Flatfile.GetRecordsResponse } = {}
      for (const [index, element] of sheets.entries()) {
        records[`Sheet[${index}]`] = await api.records.get(element.id)
      }

      try {
        const webhookReceiver = 'https://webhook.site/c83648d4-bf0c-4bb1-acb7-9c170dad4388'

        await api.jobs.ack(jobId, {
          info: `Starting Job: ${jobId}, submitting to ${webhookReceiver}`,
          progress: 10,
        })

        console.log(JSON.stringify(records, null, 2))

        const response = await fetch(webhookReceiver, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            method: 'fetch',
            sheets,
            records,
          }),
        })

        if (response.ok) {
          await api.jobs.complete(jobId, {
            outcome: {
              message: `Data was successfully submitted to ${webhookReceiver}.`,
            },
          })
        } else {
          throw new Error(`Failed to submit data to ${webhookReceiver}.`)
        }
      } catch (error) {
        console.log(`webhook.site[error]: ${JSON.stringify(error, null, 2)}`)

        await api.jobs.fail(jobId, {
          outcome: {
            message: 'Job encountered an error. It likely could not find the webhook.site URL.',
          },
        })
      }
    })
  })

  listener.use(JSONExtractor())
  listener.use(ExcelExtractor())
  listener.use(XMLExtractor())
  listener.use(ZipExtractor())
}
