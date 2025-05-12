import api, { type Flatfile } from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { jobHandler, type TickFunction } from '@flatfile/plugin-job-handler'
import { bulkRecordHook, type FlatfileRecord } from '@flatfile/plugin-record-hook'
import { configureSpace, dataChecklistPlugin } from '@flatfile/plugin-space-configure'
import { ExcelExtractor } from '@flatfile/plugin-xlsx-extractor'
import { automap } from '@flatfile/plugin-automap'
import { documents } from '../constants/ecommerce/documents'
import { guidances } from '../constants/ecommerce/guidances'
import { guides } from '../constants/ecommerce/guides'
import { theme } from '../constants/ecommerce/theme'
import { workbooks } from '../constants/ecommerce/workbooks'
import { uploadFiles, setDefaultPage, addGuides, addGuidances } from '../utils'
import { handleDemoSubmitAction } from '../constants/ecommerce/actionCallbacks'
import { exportDelimitedZip } from '@flatfile/plugin-export-delimited-zip'

export default function flatfileEventListener(listener: FlatfileListener) {
  listener.use(
    configureSpace(
      {
        workbooks,
        space: {
          metadata: {
            theme,
          },
        },
        documents,
      },
      async (event: FlatfileEvent, workbookIds: string[], tick: TickFunction) => {
        const { spaceId, environmentId } = event.context

        // set the default page to the first document
        await setDefaultPage({ spaceId, documentTitle: 'Welcome' })

        // add guides
        await addGuides(environmentId, guides)

        // add guidances
        await addGuidances(spaceId, guidances)

        // Upload demo files
        const files = [
          'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/categories.csv',
          'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/customers.csv',
          'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/orders-items.csv',
          'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/orders.csv',
          'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/products.csv',
        ]
        await uploadFiles({ spaceId, environmentId }, files)
      },
    ),
  )
  listener.use(dataChecklistPlugin())
  listener.use(
    exportDelimitedZip({
      job: 'export-workbook',
      delimiter: ',',
      fileExtension: 'csv',
    }),
  )
  listener.use(jobHandler('workbook:submitActionFg', handleDemoSubmitAction()))
  listener.use(ExcelExtractor())
  listener.use(
    automap({
      accuracy: 'confident',
      defaultTargetSheet: 'Categories',
      matchFilename: /^.*categories\.csv$/,
      onFailure: console.error,
    }),
  )
  listener.use(
    bulkRecordHook('**', async (records: FlatfileRecord[], event: FlatfileEvent) => {
      const { sheetId } = event.context
      const { data: sheet } = await api.sheets.get(sheetId)
      const sheetSlug = sheet.slug
      console.log('sheetSlug', sheetSlug)

      const dateFields = ['lastLoginDate', 'registrationDate', 'dateAdded', 'orderDate']
      for (const record of records) {
        for (const fieldKey of dateFields) {
          const dateValue = record.get(fieldKey)

          if (typeof dateValue === 'string' && dateValue.trim() !== '') {
            const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/
            const match = dateValue.match(dateRegex)

            if (match) {
              const year = Number.parseInt(match[1], 10)
              const month = Number.parseInt(match[2], 10) // month is 1-indexed from regex
              const day = Number.parseInt(match[3], 10)

              const date = new Date(year, month - 1, day) // Date constructor month is 0-indexed

              // Check if the constructed date is valid and matches the input
              // This catches invalid dates like 2023-02-30
              if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                // Date is valid, set it as a formatted string
                const formattedDate = date.toISOString().split('T')[0]
                record.set(fieldKey, formattedDate)
              } else {
                record.addError(fieldKey, 'Invalid date. Please use YYYY-MM-DD format and ensure the date is real.')
              }
            } else {
              record.addError(fieldKey, 'Invalid date format. Please use YYYY-MM-DD.')
            }
          } else if (dateValue) {
            // If it's not a string but has a value (e.g. number, boolean)
            record.addError(fieldKey, 'Invalid data type for date. Please use a string in YYYY-MM-DD format.')
          }
        }

        const prefix = 'CAT'
        if (sheetSlug === 'categories') {
          const id = record.get('id') as string
          if (!id.startsWith('CAT')) {
            record.addError('id', `Invalid ID. IDs must start with "${prefix}".`)
          }
        }
      }

      return records
    }),
  )
}
