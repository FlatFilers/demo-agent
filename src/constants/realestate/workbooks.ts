import type { Flatfile } from '@flatfile/api'

export const workbooks: Flatfile.CreateWorkbookConfig[] = [
  {
    name: 'Real Estate Workbook',
    sheets: [
      {
        name: 'Properties',
        slug: 'properties',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Property ID',
            description: 'Unique identifier for the property',
            constraints: [
              {
                type: 'required',
              },
              {
                type: 'unique',
              },
              {
                type: 'stored',
                validator: 'id-format-validator',
                config: {
                  idPrefix: 'PROP',
                },
              },
            ],
          },
          {
            key: 'propertyTypeId',
            type: 'reference',
            label: 'Property Type',
            description: 'Type of the property',
            config: {
              ref: 'property-types',
              key: 'id',
              relationship: 'has-one',
            },
          },
          {
            key: 'address',
            type: 'string',
            label: 'Address',
            description: 'Street address of the property',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'city',
            type: 'string',
            label: 'City',
            description: 'City where the property is located',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'state',
            type: 'string',
            label: 'State/Province',
            description: 'State or province where the property is located',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'zipCode',
            type: 'string',
            label: 'Zip/Postal Code',
            description: 'Zip or postal code of the property',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'country',
            type: 'string',
            label: 'Country',
            description: 'Country where the property is located',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'price',
            type: 'number',
            label: 'Price',
            description: 'Listing price in USD',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'bedrooms',
            type: 'number',
            label: 'Bedrooms',
            description: 'Number of bedrooms',
          },
          {
            key: 'bathrooms',
            type: 'number',
            label: 'Bathrooms',
            description: 'Number of bathrooms',
          },
          {
            key: 'squareFeet',
            type: 'number',
            label: 'Square Feet',
            description: 'Total square footage of the property',
          },
          {
            key: 'lotSize',
            type: 'number',
            label: 'Lot Size',
            description: 'Size of the lot in acres',
          },
          {
            key: 'yearBuilt',
            type: 'number',
            label: 'Year Built',
            description: 'Year the property was built',
          },
          {
            key: 'description',
            type: 'string',
            label: 'Description',
            description: 'Detailed property description',
          },
          {
            key: 'features',
            type: 'string',
            label: 'Features',
            description: 'Special features of the property',
          },
          {
            key: 'status',
            type: 'enum',
            label: 'Status',
            description: 'Current listing status',
            config: {
              options: [
                {
                  value: 'available',
                  label: 'Available',
                  description: 'Property is available for purchase/rent',
                },
                {
                  value: 'pending',
                  label: 'Pending',
                  description: 'Property is under contract but sale not yet finalized',
                },
                {
                  value: 'sold',
                  label: 'Sold',
                  description: 'Property has been sold',
                },
                {
                  value: 'off_market',
                  label: 'Off Market',
                  description: 'Property is temporarily off the market',
                },
                {
                  value: 'rented',
                  label: 'Rented',
                  description: 'Property is currently rented',
                },
              ],
            },
          },
          {
            key: 'listingType',
            type: 'enum',
            label: 'Listing Type',
            description: 'Type of property listing',
            config: {
              options: [
                {
                  value: 'sale',
                  label: 'For Sale',
                  description: 'Property is for sale',
                },
                {
                  value: 'rent',
                  label: 'For Rent',
                  description: 'Property is for rent',
                },
                {
                  value: 'lease',
                  label: 'For Lease',
                  description: 'Property is for lease',
                },
                {
                  value: 'auction',
                  label: 'Auction',
                  description: 'Property will be sold at auction',
                },
              ],
            },
          },
          {
            key: 'agentId',
            type: 'reference',
            label: 'Listing Agent',
            description: 'Agent responsible for the listing',
            config: {
              ref: 'agents',
              key: 'id',
              relationship: 'has-one',
            },
          },
          {
            key: 'imageUrl',
            type: 'string',
            label: 'Primary Image URL',
            description: 'URL of the primary property image',
          },
          {
            key: 'virtualTourUrl',
            type: 'string',
            label: 'Virtual Tour URL',
            description: 'URL to a virtual tour of the property',
          },
          {
            key: 'listingDate',
            type: 'date',
            label: 'Listing Date',
            description: 'Date when property was listed',
          },
        ],
      },
      {
        name: 'Property Types',
        slug: 'property-types',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Type ID',
            description: 'Unique identifier for the property type',
            constraints: [
              {
                type: 'required',
              },
              {
                type: 'unique',
              },
              {
                type: 'stored',
                validator: 'id-format-validator',
                config: {
                  idPrefix: 'PT',
                },
              },
            ],
          },
          {
            key: 'name',
            type: 'string',
            label: 'Type Name',
            description: 'Name of the property type',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'description',
            type: 'string',
            label: 'Description',
            description: 'Description of the property type',
          },
        ],
      },
      {
        name: 'Agents',
        slug: 'agents',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Agent ID',
            description: 'Unique identifier for the agent',
            constraints: [
              {
                type: 'required',
              },
              {
                type: 'unique',
              },
              {
                type: 'stored',
                validator: 'id-format-validator',
                config: {
                  idPrefix: 'AG',
                },
              },
            ],
          },
          {
            key: 'email',
            type: 'string',
            label: 'Email',
            description: 'Agent email address',
            constraints: [
              {
                type: 'required',
              },
              {
                type: 'unique',
              },
            ],
          },
          {
            key: 'firstName',
            type: 'string',
            label: 'First Name',
            description: 'Agent first name',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'lastName',
            type: 'string',
            label: 'Last Name',
            description: 'Agent last name',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'phone',
            type: 'string',
            label: 'Phone',
            description: 'Agent phone number',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'licenseNumber',
            type: 'string',
            label: 'License Number',
            description: 'Real estate license number',
            constraints: [
              {
                type: 'required',
              },
              {
                type: 'unique',
              },
            ],
          },
          {
            key: 'agency',
            type: 'string',
            label: 'Agency',
            description: 'Real estate agency or brokerage',
          },
          {
            key: 'bio',
            type: 'string',
            label: 'Biography',
            description: 'Professional biography of the agent',
          },
          {
            key: 'photoUrl',
            type: 'string',
            label: 'Photo URL',
            description: "URL to agent's professional photo",
          },
          {
            key: 'hireDate',
            type: 'date',
            label: 'Hire Date',
            description: 'Date when agent was hired',
          },
          {
            key: 'specializations',
            type: 'string',
            label: 'Specializations',
            description: "Agent's areas of specialization",
          },
        ],
      },
      {
        name: 'Clients',
        slug: 'clients',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Client ID',
            description: 'Unique identifier for the client',
            constraints: [
              {
                type: 'required',
              },
              {
                type: 'unique',
              },
              {
                type: 'stored',
                validator: 'id-format-validator',
                config: {
                  idPrefix: 'CLT',
                },
              },
            ],
          },
          {
            key: 'email',
            type: 'string',
            label: 'Email',
            description: 'Client email address',
            constraints: [
              {
                type: 'required',
              },
              {
                type: 'unique',
              },
            ],
          },
          {
            key: 'firstName',
            type: 'string',
            label: 'First Name',
            description: 'Client first name',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'lastName',
            type: 'string',
            label: 'Last Name',
            description: 'Client last name',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'phone',
            type: 'string',
            label: 'Phone',
            description: 'Client phone number',
          },
          {
            key: 'address',
            type: 'string',
            label: 'Current Address',
            description: "Client's current address",
          },
          {
            key: 'city',
            type: 'string',
            label: 'City',
            description: "Client's city",
          },
          {
            key: 'state',
            type: 'string',
            label: 'State/Province',
            description: "Client's state or province",
          },
          {
            key: 'zipCode',
            type: 'string',
            label: 'Zip/Postal Code',
            description: "Client's zip or postal code",
          },
          {
            key: 'country',
            type: 'string',
            label: 'Country',
            description: "Client's country",
          },
          {
            key: 'clientType',
            type: 'enum',
            label: 'Client Type',
            description: 'Type of client',
            config: {
              options: [
                {
                  value: 'buyer',
                  label: 'Buyer',
                  description: 'Client looking to buy property',
                },
                {
                  value: 'seller',
                  label: 'Seller',
                  description: 'Client looking to sell property',
                },
                {
                  value: 'renter',
                  label: 'Renter',
                  description: 'Client looking to rent property',
                },
                {
                  value: 'landlord',
                  label: 'Landlord',
                  description: 'Client looking to rent out property',
                },
                {
                  value: 'both',
                  label: 'Both',
                  description: 'Client both buying and selling',
                },
              ],
            },
          },
          {
            key: 'agentId',
            type: 'reference',
            label: 'Primary Agent',
            description: 'Agent working with this client',
            config: {
              ref: 'agents',
              key: 'id',
              relationship: 'has-one',
            },
          },
          {
            key: 'notes',
            type: 'string',
            label: 'Notes',
            description: 'Additional notes about the client',
          },
          {
            key: 'registrationDate',
            type: 'date',
            label: 'Registration Date',
            description: 'Date when client was registered',
          },
        ],
      },
      {
        name: 'Transactions',
        slug: 'transactions',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Transaction ID',
            description: 'Unique identifier for the transaction',
            constraints: [
              {
                type: 'required',
              },
              {
                type: 'unique',
              },
              {
                type: 'stored',
                validator: 'id-format-validator',
                config: {
                  idPrefix: 'TXN',
                },
              },
            ],
          },
          {
            key: 'propertyId',
            type: 'reference',
            label: 'Property',
            description: 'Property involved in the transaction',
            config: {
              ref: 'properties',
              key: 'id',
              relationship: 'has-one',
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'transactionType',
            type: 'enum',
            label: 'Transaction Type',
            description: 'Type of real estate transaction',
            config: {
              options: [
                {
                  value: 'sale',
                  label: 'Sale',
                  description: 'Property sale transaction',
                },
                {
                  value: 'rental',
                  label: 'Rental',
                  description: 'Property rental transaction',
                },
                {
                  value: 'lease',
                  label: 'Lease',
                  description: 'Property lease transaction',
                },
              ],
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'clientId',
            type: 'reference',
            label: 'Client',
            description: 'Client involved in the transaction',
            config: {
              ref: 'clients',
              key: 'id',
              relationship: 'has-one',
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'agentId',
            type: 'reference',
            label: 'Agent',
            description: 'Agent handling the transaction',
            config: {
              ref: 'agents',
              key: 'id',
              relationship: 'has-one',
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'transactionDate',
            type: 'date',
            label: 'Transaction Date',
            description: 'Date of the transaction',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'closingDate',
            type: 'date',
            label: 'Closing Date',
            description: 'Date when the transaction was closed',
          },
          {
            key: 'status',
            type: 'enum',
            label: 'Status',
            description: 'Current status of the transaction',
            config: {
              options: [
                {
                  value: 'pending',
                  label: 'Pending',
                  description: 'Transaction in progress',
                },
                {
                  value: 'under_contract',
                  label: 'Under Contract',
                  description: 'Property is under contract',
                },
                {
                  value: 'closed',
                  label: 'Closed',
                  description: 'Transaction has been completed',
                },
                {
                  value: 'cancelled',
                  label: 'Cancelled',
                  description: 'Transaction has been cancelled',
                },
              ],
            },
          },
          {
            key: 'salePrice',
            type: 'number',
            label: 'Sale Price',
            description: 'Final sale price',
          },
          {
            key: 'commission',
            type: 'number',
            label: 'Commission',
            description: 'Agent commission amount',
          },
          {
            key: 'notes',
            type: 'string',
            label: 'Notes',
            description: 'Additional transaction notes',
          },
        ],
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
