import type { Flatfile } from '@flatfile/api'
import { documents as ecommerceDocuments } from '../constants/ecommerce/documents'
import { workbooks as ecommerceWorkbooks } from '../constants/ecommerce/workbooks'
import { documents as financeDocuments } from '../constants/finance/documents'
import { workbooks as financeWorkbooks } from '../constants/finance/workbooks'
import { documents as healthcareDocuments } from '../constants/healthcare/documents'
import { workbooks as healthcareWorkbooks } from '../constants/healthcare/workbooks'
import { documents as realEstateDocuments } from '../constants/realestate/documents'
import { workbooks as realEstateWorkbooks } from '../constants/realestate/workbooks'

export type IndustryDemo = {
  name: string
  slug: string
  workbook: Flatfile.CreateWorkbookConfig[]
  documents: Flatfile.DocumentConfig[]
  files: string[]
  automap: {
    sheetSlug: string
    matchFilename: RegExp
  }
}

export const industryConfig: IndustryDemo[] = [
  {
    name: 'Ecommerce',
    slug: 'ecommerce',
    workbook: ecommerceWorkbooks,
    documents: ecommerceDocuments,
    files: [
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/ecommerce/categories.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/ecommerce/customers.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/ecommerce/orders-items.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/ecommerce/orders.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/ecommerce/products.csv',
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
    documents: realEstateDocuments,
    files: [
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/realestate/agents.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/realestate/clients.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/realestate/properties.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/realestate/property-types.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/realestate/transactions.csv',
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
    documents: healthcareDocuments,
    files: [
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/healthcare/patients.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/healthcare/providers.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/healthcare/facilities.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/healthcare/medications.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/healthcare/prescriptions.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/healthcare/insurance-plans.csv',
    ],
    automap: {
      sheetSlug: 'insurance-plans',
      matchFilename: /^.*insurance-plans\.csv$/,
    },
  },
  {
    name: 'Finance',
    slug: 'finance',
    workbook: financeWorkbooks,
    documents: financeDocuments,
    files: [
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/finance/customers.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/finance/accounts.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/finance/transactions.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/finance/loans.csv',
      'https://raw.githubusercontent.com/FlatFilers/demo-agent/refs/heads/main/src/files/finance/investments.csv',
    ],
    automap: {
      sheetSlug: 'customers',
      matchFilename: /^.*customers\.csv$/,
    },
  },
]
