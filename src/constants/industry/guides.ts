import type { Flatfile } from '@flatfile/api'

export const guides: Omit<Flatfile.GuideCreateRequest, 'environmentId'>[] = [
  {
    slug: 'upload-guide',
    title: 'Uploading Files',
    description: 'Uploading files to the platform',
    blocks: [
      {
        type: 'markdown',
        content: '# File Upload',
      },
      {
        type: 'markdown',
        content: 'Drag and drop your files here...',
      },
    ],
  },
  {
    slug: 'manage-columns-guide',
    title: 'Manage Columns',
    description: 'Managing columns on a Sheet',
    blocks: [
      {
        type: 'markdown',
        content: '# Manage Columns',
      },
      {
        type: 'markdown',
        content:
          'This button provides you with options to show/hide columns in your sheet. Before you can used this, you will need to map data to your sheet.',
      },
    ],
  },
]
