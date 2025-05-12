import type { Flatfile } from '@flatfile/api'
import { documents as ecommerceDocuments } from '../constants/ecommerce/documents'
import { theme as ecommerceTheme } from '../constants/ecommerce/theme'
import { workbooks as ecommerceWorkbooks } from '../constants/ecommerce/workbooks'
import { documents as realEstateDocuments } from '../constants/realestate/documents'
import { theme as realEstateTheme } from '../constants/realestate/theme'
import { workbooks as realEstateWorkbooks } from '../constants/realestate/workbooks'
import { documents as healthcareDocuments } from '../constants/healthcare/documents'
import { theme as healthcareTheme } from '../constants/healthcare/theme'
import { workbooks as healthcareWorkbooks } from '../constants/healthcare/workbooks'

export type IndustryDemo = {
  name: string
  slug: string
  workbook: Flatfile.CreateWorkbookConfig[]
  theme: any
  documents: Flatfile.DocumentConfig[]
  files: string[]
  automap: {
    sheetSlug: string
    matchFilename: RegExp
  }
}

export const industryDemos: IndustryDemo[] = [
  {
    name: 'Ecommerce',
    slug: 'ecommerce',
    workbook: ecommerceWorkbooks,
    theme: ecommerceTheme,
    documents: ecommerceDocuments,
    files: [
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/categories.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/customers.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/orders-items.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/orders.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/ecommerce/products.csv',
    ],
    automap: {
      sheetSlug: 'categories',
      matchFilename: /^.*categories\.csv$/,
    },
  },
  {
    name: 'Real Estate',
    slug: 'realestate',
    workbook: realEstateWorkbooks,
    theme: realEstateTheme,
    documents: realEstateDocuments,
    files: [
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/realestate/agents.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/realestate/clients.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/realestate/properties.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/realestate/property-types.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/realestate/transactions.csv',
    ],
    automap: {
      sheetSlug: 'property-types',
      matchFilename: /^.*property-types\.csv$/,
    },
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    workbook: healthcareWorkbooks,
    theme: healthcareTheme,
    documents: healthcareDocuments,
    files: [
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/healthcare/patients.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/healthcare/providers.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/healthcare/facilities.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/healthcare/medications.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/healthcare/prescriptions.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/healthcare/insurance-plans.csv',
    ],
    automap: {
      sheetSlug: 'insurance-plans',
      matchFilename: /^.*insurance-plans\.csv$/,
    },
  },
]
