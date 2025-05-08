import api from '@flatfile/api'
import type { Client, FlatfileEvent, FlatfileListener } from '@flatfile/listener'

import { JSONExtractor } from '@flatfile/plugin-json-extractor'
import { ExcelExtractor } from '@flatfile/plugin-xlsx-extractor'
import { XMLExtractor } from '@flatfile/plugin-xml-extractor'
import { ZipExtractor } from '@flatfile/plugin-zip-extractor'
import { extractorDocument } from '../constants/documents.json'
import movies from '../constants/movies.json'

export default function flatfileEventListener(listener: Client) {
  listener.filter({ job: 'space:configure' }, (configure: FlatfileListener) => {
    configure.on('job:ready', async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
      try {
        await api.jobs.ack(jobId, {
          info: 'Job started.',
          progress: 10,
        })

        const { data } = await api.documents.create(spaceId, {
          title: 'About this Extractor Demo',
          body: extractorDocument,
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

        const movieWorkbook = {
          ...{ Labels: ['Primary', 'Extractor-Demo'] },
          ...movies,
        }

        // @ts-ignore
        await api.workbooks.create({
          spaceId,
          environmentId,
          ...movieWorkbook,
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

  listener.use(JSONExtractor())
  listener.use(ExcelExtractor())
  listener.use(XMLExtractor())
  listener.use(ZipExtractor())
}
