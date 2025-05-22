import type { Flatfile } from '@flatfile/api'

export const documents: Flatfile.DocumentConfig[] = [
  {
    title: 'Welcome',
    body: `# Welcome to the Financial Demo

This demo showcases how Flatfile can streamline data import and management for financial services companies. Whether you're importing customer records, account information, transaction data, or investment details, Flatfile provides the tools to make your data onboarding efficient and error-free.

## Key Features

- **Automated Field Mapping** - Intelligently maps your data fields to the correct schema
- **Data Validation** - Ensures data meets required financial industry standards and formats
- **Reference Validation** - Verifies relationships between related financial entities
- **Data Transformation** - Converts your data to the proper format during import
- **Secure Data Handling** - Maintains security and compliance with financial data regulations

## Getting Started

1. **Upload your data files** - We've provided sample CSV files for each entity
2. **Map your fields** - Our automapping will attempt to match your columns to our schema
3. **Review and validate** - Check for any validation issues that need attention
4. **Submit your data** - When everything looks good, submit your data

## Sample Files

We've provided sample files demonstrating a complete financial data model:

- **Customers** - Customer profiles and basic information
- **Accounts** - Various account types including checking, savings, and investment
- **Transactions** - Financial transactions with categorization
- **Loans** - Different loan products and payment details
- **Investments** - Investment holdings and performance

## Need Help?

Click on any data sheet to see field descriptions and validation requirements. If you encounter any issues or have questions, contact our support team.
`,
  },
]
