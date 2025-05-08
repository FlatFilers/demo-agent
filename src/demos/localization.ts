import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import baseWorkbook from '../constants/localizationWorkbook.json'

export default function flatfileEventListener(listener: FlatfileListener) {
  listener.filter({ job: 'space:configure' }, (configure: FlatfileListener) => {
    configure.on('job:ready', async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
      try {
        await api.jobs.ack(jobId, {
          info: 'Job started.',
          progress: 10,
        })

        //documents are using translation keys instead of hardcoding strings
        const document = await api.documents.create(spaceId, {
          title: 'myDocument.title', // "About this Localization Demo",
          body: 'myDocument.body', // localizationDocument
        })

        //setting the translation path for the space
        await api.spaces.update(spaceId, {
          metadata: {
            sidebarConfig: {
              defaultPage: {
                documentId: document.data.id,
              },
            },
          },
          translationsPath:
            'https://raw.githubusercontent.com/FlatFilers/Platform-Translations/demo-structure/locales/en/translation.json',
        })

        const localizationWorkbook = {
          ...{ Labels: ['Primary', 'Localization-Demo'] },
          ...baseWorkbook,
        }
        // @ts-ignore
        await api.workbooks.create({
          spaceId,
          environmentId,
          ...localizationWorkbook,
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
