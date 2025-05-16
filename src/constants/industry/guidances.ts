import type { Flatfile } from '@flatfile/api'

export const guidances: Flatfile.GuidanceApiCreateData[] = [
  {
    guideSlug: 'upload-guide',
    options: {
      target: 'sidebar:files_tab',
      type: 'popout',
      trigger: 'hover',
    },
  },
  {
    guideSlug: 'manage-columns-guide',
    options: {
      target: 'sheet:manage_columns',
      type: 'popout',
      trigger: 'hover',
    },
  },
]
