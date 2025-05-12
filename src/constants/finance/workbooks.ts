import type { Flatfile } from '@flatfile/api'

export const workbooks: Flatfile.CreateWorkbookConfig[] = [
  {
    name: 'Financial Services Platform',
    sheets: [
      {
        name: 'Customers',
        slug: 'customers',
        fields: [
          {
            key: 'customer_id',
            type: 'string',
            label: 'Customer ID',
            description: 'Unique identifier for customer',
            constraints: [{ type: 'required' }, { type: 'unique' }],
          },
          {
            key: 'first_name',
            type: 'string',
            label: 'First Name',
            description: "Customer's first name (individuals only)",
          },
          {
            key: 'last_name',
            type: 'string',
            label: 'Last Name',
            description: "Customer's last name (individuals only)",
          },
          {
            key: 'email',
            type: 'string',
            label: 'Email',
            description: "Customer's email address",
            constraints: [
              {
                type: 'external',
                validator: 'email-validator',
              },
            ],
          },
          {
            key: 'phone',
            type: 'string',
            label: 'Phone',
            description: "Customer's phone number",
          },
          {
            key: 'address',
            type: 'string',
            label: 'Address',
            description: "Customer's street address",
          },
          {
            key: 'city',
            type: 'string',
            label: 'City',
            description: "Customer's city",
          },
          {
            key: 'state',
            type: 'string',
            label: 'State',
            description: "Customer's state (2-letter code)",
          },
          {
            key: 'zip',
            type: 'string',
            label: 'ZIP Code',
            description: "Customer's ZIP/postal code",
          },
          {
            key: 'country',
            type: 'string',
            label: 'Country',
            description: "Customer's country (defaults to USA)",
          },
          {
            key: 'date_of_birth',
            type: 'date',
            label: 'Date of Birth',
            description: "Customer's date of birth (individuals only)",
          },
          {
            key: 'ssn',
            type: 'string',
            label: 'SSN',
            description: 'Last 4 digits of SSN (masked, individuals only)',
          },
          {
            key: 'customer_type',
            type: 'enum',
            label: 'Customer Type',
            description: 'Type of customer',
            config: {
              options: [
                { value: 'individual', label: 'Individual' },
                { value: 'business', label: 'Business' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'credit_score',
            type: 'number',
            label: 'Credit Score',
            description: "Customer's credit score (individuals only)",
          },
          {
            key: 'onboarding_date',
            type: 'date',
            label: 'Onboarding Date',
            description: 'Date customer was onboarded',
            constraints: [{ type: 'required' }],
          },
        ],
        metadata: {
          idPrefix: 'C', // Used in validation
        },
      },
      {
        name: 'Accounts',
        slug: 'accounts',
        fields: [
          {
            key: 'account_id',
            type: 'string',
            label: 'Account ID',
            description: 'Unique identifier for account',
            constraints: [{ type: 'required' }, { type: 'unique' }],
          },
          {
            key: 'customer_id',
            type: 'reference',
            label: 'Customer ID',
            description: 'Associated customer ID',
            config: {
              ref: 'customers',
              key: 'customer_id',
              relationship: 'has-one',
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'account_type',
            type: 'enum',
            label: 'Account Type',
            description: 'Type of account',
            config: {
              options: [
                { value: 'checking', label: 'Checking' },
                { value: 'savings', label: 'Savings' },
                { value: 'credit_card', label: 'Credit Card' },
                { value: 'investment', label: 'Investment' },
                { value: 'business_checking', label: 'Business Checking' },
                { value: 'business_savings', label: 'Business Savings' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'account_number',
            type: 'string',
            label: 'Account Number',
            description: 'Account number',
            constraints: [{ type: 'required' }, { type: 'unique' }],
          },
          {
            key: 'routing_number',
            type: 'string',
            label: 'Routing Number',
            description: 'Bank routing number (for checking/savings accounts)',
          },
          {
            key: 'balance',
            type: 'number',
            label: 'Balance',
            description: 'Current account balance',
          },
          {
            key: 'currency',
            type: 'enum',
            label: 'Currency',
            description: 'Account currency',
            config: {
              options: [
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' },
                { value: 'GBP', label: 'British Pound (GBP)' },
                { value: 'CAD', label: 'Canadian Dollar (CAD)' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'interest_rate',
            type: 'number',
            label: 'Interest Rate (%)',
            description: 'Annual interest rate (if applicable)',
          },
          {
            key: 'open_date',
            type: 'date',
            label: 'Open Date',
            description: 'Date account was opened',
            constraints: [{ type: 'required' }],
          },
          {
            key: 'status',
            type: 'enum',
            label: 'Status',
            description: 'Account status',
            config: {
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'closed', label: 'Closed' },
                { value: 'frozen', label: 'Frozen' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'primary_account',
            type: 'boolean',
            label: 'Primary Account',
            description: "Whether this is the customer's primary account",
            config: {
              allowIndeterminate: false,
            },
          },
        ],
        metadata: {
          idPrefix: 'ACC', // Used in validation
        },
      },
      {
        name: 'Transactions',
        slug: 'transactions',
        fields: [
          {
            key: 'transaction_id',
            type: 'string',
            label: 'Transaction ID',
            description: 'Unique identifier for transaction',
            constraints: [{ type: 'required' }, { type: 'unique' }],
          },
          {
            key: 'account_id',
            type: 'reference',
            label: 'Account ID',
            description: 'Associated account ID',
            config: {
              ref: 'accounts',
              key: 'account_id',
              relationship: 'has-one',
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'transaction_type',
            type: 'enum',
            label: 'Transaction Type',
            description: 'Type of transaction',
            config: {
              options: [
                { value: 'debit', label: 'Debit' },
                { value: 'credit', label: 'Credit' },
                { value: 'transfer', label: 'Transfer' },
                { value: 'payment', label: 'Payment' },
                { value: 'withdrawal', label: 'Withdrawal' },
                { value: 'deposit', label: 'Deposit' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'amount',
            type: 'number',
            label: 'Amount',
            description: 'Transaction amount',
            constraints: [{ type: 'required' }],
          },
          {
            key: 'currency',
            type: 'enum',
            label: 'Currency',
            description: 'Transaction currency',
            config: {
              options: [
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' },
                { value: 'GBP', label: 'British Pound (GBP)' },
                { value: 'CAD', label: 'Canadian Dollar (CAD)' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'transaction_date',
            type: 'date',
            label: 'Transaction Date',
            description: 'Date of transaction',
            constraints: [{ type: 'required' }],
          },
          {
            key: 'description',
            type: 'string',
            label: 'Description',
            description: 'Transaction description',
          },
          {
            key: 'category',
            type: 'string',
            label: 'Category',
            description: 'Transaction category',
          },
          {
            key: 'merchant_name',
            type: 'string',
            label: 'Merchant Name',
            description: 'Name of merchant (if applicable)',
          },
          {
            key: 'status',
            type: 'enum',
            label: 'Status',
            description: 'Transaction status',
            config: {
              options: [
                { value: 'pending', label: 'Pending' },
                { value: 'completed', label: 'Completed' },
                { value: 'failed', label: 'Failed' },
                { value: 'canceled', label: 'Canceled' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'reference_number',
            type: 'string',
            label: 'Reference Number',
            description: 'Transaction reference number',
          },
        ],
        metadata: {
          idPrefix: 'TX', // Used in validation
        },
      },
      {
        name: 'Loans',
        slug: 'loans',
        fields: [
          {
            key: 'loan_id',
            type: 'string',
            label: 'Loan ID',
            description: 'Unique identifier for loan',
            constraints: [{ type: 'required' }, { type: 'unique' }],
          },
          {
            key: 'customer_id',
            type: 'reference',
            label: 'Customer ID',
            description: 'Associated customer ID',
            config: {
              ref: 'customers',
              key: 'customer_id',
              relationship: 'has-one',
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'loan_type',
            type: 'enum',
            label: 'Loan Type',
            description: 'Type of loan',
            config: {
              options: [
                { value: 'mortgage', label: 'Mortgage' },
                { value: 'auto', label: 'Auto Loan' },
                { value: 'personal', label: 'Personal Loan' },
                { value: 'business', label: 'Business Loan' },
                { value: 'student', label: 'Student Loan' },
                { value: 'home_equity', label: 'Home Equity Loan' },
                { value: 'line_of_credit', label: 'Line of Credit' },
                { value: 'equipment', label: 'Equipment Loan' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'amount',
            type: 'number',
            label: 'Loan Amount',
            description: 'Original loan amount',
            constraints: [{ type: 'required' }],
          },
          {
            key: 'currency',
            type: 'enum',
            label: 'Currency',
            description: 'Loan currency',
            config: {
              options: [
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' },
                { value: 'GBP', label: 'British Pound (GBP)' },
                { value: 'CAD', label: 'Canadian Dollar (CAD)' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'interest_rate',
            type: 'number',
            label: 'Interest Rate (%)',
            description: 'Annual interest rate',
            constraints: [{ type: 'required' }],
          },
          {
            key: 'term_months',
            type: 'number',
            label: 'Term (Months)',
            description: 'Loan term in months',
            constraints: [{ type: 'required' }],
          },
          {
            key: 'start_date',
            type: 'date',
            label: 'Start Date',
            description: 'Loan start date',
            constraints: [{ type: 'required' }],
          },
          {
            key: 'maturity_date',
            type: 'date',
            label: 'Maturity Date',
            description: 'Loan maturity date',
          },
          {
            key: 'payment_frequency',
            type: 'enum',
            label: 'Payment Frequency',
            description: 'Frequency of loan payments',
            config: {
              options: [
                { value: 'monthly', label: 'Monthly' },
                { value: 'bi-weekly', label: 'Bi-Weekly' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'as_needed', label: 'As Needed' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'monthly_payment',
            type: 'number',
            label: 'Monthly Payment',
            description: 'Regular payment amount',
          },
          {
            key: 'remaining_balance',
            type: 'number',
            label: 'Remaining Balance',
            description: 'Current outstanding balance',
          },
          {
            key: 'status',
            type: 'enum',
            label: 'Status',
            description: 'Loan status',
            config: {
              options: [
                { value: 'active', label: 'Active' },
                { value: 'paid_off', label: 'Paid Off' },
                { value: 'defaulted', label: 'Defaulted' },
                { value: 'in_collection', label: 'In Collection' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
        ],
        metadata: {
          idPrefix: 'LN', // Used in validation
        },
      },
      {
        name: 'Investments',
        slug: 'investments',
        fields: [
          {
            key: 'investment_id',
            type: 'string',
            label: 'Investment ID',
            description: 'Unique identifier for investment',
            constraints: [{ type: 'required' }, { type: 'unique' }],
          },
          {
            key: 'account_id',
            type: 'reference',
            label: 'Account ID',
            description: 'Associated account ID',
            config: {
              ref: 'accounts',
              key: 'account_id',
              relationship: 'has-one',
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'customer_id',
            type: 'reference',
            label: 'Customer ID',
            description: 'Associated customer ID',
            config: {
              ref: 'customers',
              key: 'customer_id',
              relationship: 'has-one',
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'investment_type',
            type: 'enum',
            label: 'Investment Type',
            description: 'Type of investment',
            config: {
              options: [
                { value: 'stock', label: 'Stock' },
                { value: 'bond', label: 'Bond' },
                { value: 'mutual_fund', label: 'Mutual Fund' },
                { value: 'etf', label: 'ETF' },
                { value: 'reit', label: 'REIT' },
                { value: 'cd', label: 'Certificate of Deposit' },
                { value: 'option', label: 'Option' },
              ],
            },
            constraints: [{ type: 'required' }],
          },
          {
            key: 'ticker_symbol',
            type: 'string',
            label: 'Ticker Symbol',
            description: 'Investment ticker symbol',
          },
          {
            key: 'shares',
            type: 'number',
            label: 'Shares',
            description: 'Number of shares owned',
          },
          {
            key: 'purchase_price',
            type: 'number',
            label: 'Purchase Price',
            description: 'Price per share at purchase',
          },
          {
            key: 'purchase_date',
            type: 'date',
            label: 'Purchase Date',
            description: 'Date of investment purchase',
            constraints: [{ type: 'required' }],
          },
          {
            key: 'current_price',
            type: 'number',
            label: 'Current Price',
            description: 'Current price per share',
          },
          {
            key: 'current_value',
            type: 'number',
            label: 'Current Value',
            description: 'Total current value of investment',
          },
          {
            key: 'gain_loss',
            type: 'number',
            label: 'Gain/Loss',
            description: 'Total gain or loss on investment',
          },
          {
            key: 'sector',
            type: 'string',
            label: 'Sector',
            description: 'Investment sector/category',
          },
        ],
        metadata: {
          idPrefix: 'INV', // Used in validation
        },
      },
    ],
    actions: [
      {
        operation: 'submitActionFg',
        mode: 'foreground',
        label: 'Submit',
        type: 'string',
        description: 'Submit Data',
        primary: true,
      },
      {
        operation: 'export-workbook',
        mode: 'foreground',
        label: 'Export Workbook',
        type: 'string',
        description: 'Export Workbook',
      },
    ],
  },
]
