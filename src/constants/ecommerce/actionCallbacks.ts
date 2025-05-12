import api, { type Flatfile } from '@flatfile/api'
import type { FlatfileEvent } from '@flatfile/listener'
import type { TickFunction } from '@flatfile/plugin-job-handler'
import { sleep } from '../../utils'

export function handleDemoSubmitAction() {
  return async (event: FlatfileEvent, tick: TickFunction) => {
    const { workbookId } = event.context
    try {
      await tick(0, 'Job started.')
      const { data: workbook } = await api.workbooks.get(workbookId)

      const sheets = workbook.sheets

      if (sheets) {
        const totalSheets = sheets.length
        let progress = 0
        for (const sheet of sheets) {
          while (progress < (sheets.indexOf(sheet) + 1) * (100 / totalSheets)) {
            progress += 1
            await tick(progress, `Submitting sheet: ${sheet.name} (${sheets.indexOf(sheet) + 1}/${totalSheets})`)
            await sleep(5)
          }
        }
      } else {
        throw new Error('No sheets found in workbook.')
      }

      return {
        outcome: {
          message: `${workbook.name} data has been successfully submitted.`,
        },
      } as Flatfile.JobCompleteDetails
    } catch (error) {
      console.error('Error:', (error as unknown as Error).stack)

      throw new Error('An error occurred during demo submit action.')
    }
  }
}
