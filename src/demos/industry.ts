import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { automap } from '@flatfile/plugin-automap'
import { exportDelimitedZip } from '@flatfile/plugin-export-delimited-zip'
import { type TickFunction, jobHandler } from '@flatfile/plugin-job-handler'
import { configureSpace, dataChecklistPlugin } from '@flatfile/plugin-space-configure'
import { storedConstraint } from '@flatfile/plugin-stored-constraints'
import { ExcelExtractor } from '@flatfile/plugin-xlsx-extractor'
import { handleDemoSubmitAction } from '../constants/industry/actionCallbacks'
import { constraints } from '../constants/industry/constraints'
import { guidances } from '../constants/industry/guidances'
import { guides } from '../constants/industry/guides'
import { addGuidances, addGuides, addStoredConstraints, setDefaultPage, uploadFiles } from '../utils'
import type { IndustryDemo } from './industryConfig'

export default function industryListener(industry: IndustryDemo) {
  return function flatfileEventListener(listener: FlatfileListener) {
    listener.use(
      configureSpace(
        {
          workbooks: industry.workbook,
          space: {
            metadata: {
              theme: industry.theme,
            },
          },
          documents: industry.documents,
        },
        async (event: FlatfileEvent, workbookIds: string[], tick: TickFunction) => {
          const { spaceId, environmentId } = event.context

          // add stored onstraints
          await addStoredConstraints(spaceId, constraints)

          // set the default page to the 'Welcome' document
          await setDefaultPage({ spaceId, documentTitle: 'Welcome' })

          // add guides
          await addGuides(environmentId, guides)

          // add guidances
          await addGuidances(spaceId, guidances)

          // Upload demo files
          const files = industry.files
          await uploadFiles({ spaceId, environmentId }, files)
        },
      ),
    )
    listener.use(storedConstraint())
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
        defaultTargetSheet: industry.automap.sheetSlug,
        matchFilename: industry.automap.matchFilename,
        onFailure: console.error,
      }),
    )
  }
}
