import type { Flatfile } from '@flatfile/api'

export const documents: Flatfile.DocumentConfig[] = [
  {
    title: 'Welcome to the Financial Services Data Platform',
    body: `# Welcome to the Financial Services Data Platform

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
    treatments: [],
  },
  {
    title: 'Data Model Overview',
    body: `# Financial Services Data Model Overview

Our financial services platform is built around a comprehensive data model with five core entities:

## Customer Entity

The foundation of our data model, containing all individual and business customer information:

- Basic contact information (name, email, phone, address)
- Customer type (individual or business)
- For individuals: demographic information, date of birth, SSN (masked)
- Credit score and onboarding date

## Account Entity

Represents the various financial accounts a customer can hold:

- Account identification (ID, account number, routing number)
- Linked to customer records via customer_id
- Account type (checking, savings, credit card, investment, etc.)
- Balance and currency information
- Interest rates and account status

## Transaction Entity

Captures all financial activities across accounts:

- Transaction details (amount, date, type)
- Category and merchant information for spending analytics
- Connected to accounts via account_id
- Status tracking (pending, completed, failed, canceled)

## Loan Entity

Manages all loan products and their repayment details:

- Loan type (mortgage, auto, personal, business, etc.)
- Amount, term, and interest rate information
- Payment schedules and remaining balances
- Maturity dates and status tracking

## Investment Entity

Tracks investment holdings and performance metrics:

- Investment types (stocks, bonds, mutual funds, ETFs, etc.)
- Purchase information and current valuation
- Gain/loss tracking
- Sector classification

## Entity Relationships

- **Customers → Accounts**: One-to-many (a customer can have multiple accounts)
- **Accounts → Transactions**: One-to-many (an account can have multiple transactions)
- **Customers → Loans**: One-to-many (a customer can have multiple loans)
- **Accounts → Investments**: One-to-many (an investment account can have multiple investment holdings)
- **Customers → Investments**: One-to-many (a customer can own multiple investments)

This comprehensive data model enables robust financial data management, reporting, and analytics.
`,
    treatments: [],
  },
  {
    title: 'Data Validation Rules',
    body: `# Data Validation Rules

Our financial services platform enforces several important validation rules to ensure data integrity and accuracy.

## ID Format Validation

Each entity uses a specific prefix format for IDs:

- **Customers**: IDs must begin with "C" (e.g., C10001)
- **Accounts**: IDs must begin with "ACC" (e.g., ACC20001)
- **Transactions**: IDs must begin with "TX" (e.g., TX30001)
- **Loans**: IDs must begin with "LN" (e.g., LN40001)
- **Investments**: IDs must begin with "INV" (e.g., INV50001)

## Required Fields

The following fields are required across entities:

### Customers
- customer_id
- customer_type
- onboarding_date

### Accounts
- account_id
- customer_id
- account_type
- account_number
- currency
- open_date
- status

### Transactions
- transaction_id
- account_id
- transaction_type
- amount
- currency
- transaction_date
- status

### Loans
- loan_id
- customer_id
- loan_type
- amount
- currency
- interest_rate
- term_months
- start_date
- payment_frequency
- status

### Investments
- investment_id
- account_id
- customer_id
- investment_type
- purchase_date

## Unique Constraints

The following fields must contain unique values:

- All ID fields (customer_id, account_id, transaction_id, loan_id, investment_id)
- account_number

## Reference Validation

References between entities are validated to ensure data integrity:

- account_id in Transactions must reference a valid account_id in Accounts
- customer_id in Accounts, Loans, and Investments must reference a valid customer_id in Customers
- account_id in Investments must reference a valid account_id in Accounts

## Date Validation

All dates will be validated to ensure:
- They are in a proper date format (YYYY-MM-DD)
- They are within reasonable ranges (e.g., dates cannot be in the future except for loan maturity dates)

## Numeric Validation

- All monetary amounts are validated as positive numbers
- Interest rates are validated as percentages (0-100)
- Credit scores are validated as numbers between 300-850

These validation rules ensure that your financial data meets industry standards and maintains integrity across all entities in the system.
`,
    treatments: [],
  },
  {
    title: 'Sample Data Guide',
    body: `# Sample Data Guide

We've provided sample data files to help you get started with the Financial Services Data Platform. These files contain realistic (but fictional) data that demonstrates the data model and relationships.

## Files Overview

### customers.csv
- 10 sample customers (both individuals and businesses)
- Contains demographic and contact information
- Credit scores for individuals
- Onboarding dates for all customers

### accounts.csv
- 18 sample accounts across different account types
- Each linked to a customer record
- Includes account numbers, balances, and statuses
- Shows how one customer can have multiple accounts

### transactions.csv
- 20 sample transactions across different accounts
- Various transaction types (debit, credit, transfers)
- Different categories for spending analysis
- Reference numbers and merchant information

### loans.csv
- 10 sample loans across different loan types
- Mortgage, personal, auto, and business loans
- Various terms, interest rates, and payment schedules
- Shows remaining balances and loan statuses

### investments.csv
- 10 sample investments across different investment types
- Stocks, ETFs, mutual funds, bonds, and REITs
- Purchase information and current valuations
- Shows gain/loss calculations and sector classifications

## How to Use the Sample Data

1. **Explore the relationships**: Notice how accounts link to customers, transactions link to accounts, etc.

2. **Test the validation**: Try modifying some values to trigger validation rules.

3. **Test automapping**: Upload the CSV files to see how our automapping feature works.

4. **Practice data transformation**: Use this data to test different data transformations and exports.

5. **Create your own data**: Use these samples as templates for creating your own test data.

The sample data demonstrates a complete financial ecosystem with interconnected entities, providing a realistic example of how financial data works within the platform.
`,
    treatments: [],
  },
]
