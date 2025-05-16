import type { Flatfile } from '@flatfile/api'

export const documents: Flatfile.DocumentConfig[] = [
  {
    title: 'Welcome',
    body: "# Welcome to your Real Estate Workbook!\n\n## This workbook is designed to help you manage your real estate business data.\n\nInside, you'll find sheets for managing:\n\n- **Properties:** Maintain your property listings with details such as address, price, features, status, and more.\n- **Property Types:** Categorize properties into different types like residential, commercial, multifamily, etc.\n- **Agents:** Keep track of your real estate agents, including their contact information, license numbers, and specializations.\n- **Clients:** Manage your client database, including buyers, sellers, renters, and landlords.\n- **Transactions:** Record all property transactions, including sales, rentals, and leases.\n\n## Getting Started:\n\n1. **Explore the Sheets:** Familiarize yourself with the different sheets and their columns.\n2. **Import Your Data:** Use Flatfile's import capabilities to populate the sheets with your existing real estate data. Sample files are provided for each sheet.\n3. **Manage and Validate:** Leverage the built-in data validation and transformation features to ensure your data is accurate and consistent.\n\nHappy Flatfiling!",
  },
]
