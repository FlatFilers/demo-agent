import type { Flatfile } from '@flatfile/api'

export const workbooks: Flatfile.CreateWorkbookConfig[] = [
  {
    name: 'Ecommerce Workbook',
    sheets: [
      {
        name: 'Products',
        slug: 'products',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Product ID',
            description: 'Unique identifier for the product',
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
            key: 'sku',
            type: 'string',
            label: 'SKU',
            description: 'Stock Keeping Unit',
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
            key: 'name',
            type: 'string',
            label: 'Product Name',
            description: 'Name of the product',
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
            description: 'Detailed product description',
          },
          {
            key: 'price',
            type: 'number',
            label: 'Price',
            description: 'Product price in USD',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'cost',
            type: 'number',
            label: 'Cost',
            description: 'Product cost in USD',
          },
          {
            key: 'categoryId',
            type: 'reference',
            label: 'Category',
            description: 'Product category',
            config: {
              ref: 'categories',
              key: 'id',
              relationship: 'has-one',
            },
          },
          {
            key: 'inventoryCount',
            type: 'number',
            label: 'Inventory',
            description: 'Current inventory count',
          },
          {
            key: 'status',
            type: 'enum',
            label: 'Status',
            description: 'Product status',
            config: {
              options: [
                {
                  value: 'active',
                  label: 'Active',
                  description: 'Product is available for sale',
                },
                {
                  value: 'inactive',
                  label: 'Inactive',
                  description: 'Product is temporarily unavailable',
                },
                {
                  value: 'discontinued',
                  label: 'Discontinued',
                  description: 'Product is no longer sold',
                },
              ],
            },
          },
          {
            key: 'imageUrl',
            type: 'string',
            label: 'Image URL',
            description: 'URL of the product image',
          },

          {
            key: 'weight',
            type: 'number',
            label: 'Weight (kg)',
            description: 'Product weight in kilograms',
          },
          {
            key: 'dimensions',
            type: 'string',
            label: 'Dimensions',
            description: 'Product dimensions (LxWxH)',
          },
          {
            key: 'dateAdded',
            type: 'date',
            label: 'Date Added',
            description: 'Date when product was added to inventory',
          },
        ],
        metadata: {
          idPrefix: 'P',
        },
      },
      {
        name: 'Categories',
        slug: 'categories',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Category ID',
            description: 'Unique identifier for the category',
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
            key: 'name',
            type: 'string',
            label: 'Category Name',
            description: 'Name of the category',
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
            description: 'Category description',
          },
        ],
        metadata: {
          idPrefix: 'CAT',
        },
      },
      {
        name: 'Customers',
        slug: 'customers',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Customer ID',
            description: 'Unique identifier for the customer',
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
            key: 'email',
            type: 'string',
            label: 'Email',
            description: 'Customer email address',
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
            description: 'Customer first name',
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
            description: 'Customer last name',
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
            description: 'Customer phone number',
          },
          {
            key: 'address1',
            type: 'string',
            label: 'Address Line 1',
            description: 'Customer street address',
          },
          {
            key: 'address2',
            type: 'string',
            label: 'Address Line 2',
            description: 'Apartment, suite, etc.',
          },
          {
            key: 'city',
            type: 'string',
            label: 'City',
            description: 'Customer city',
          },
          {
            key: 'state',
            type: 'string',
            label: 'State/Province',
            description: 'Customer state or province',
          },
          {
            key: 'postalCode',
            type: 'string',
            label: 'Postal Code',
            description: 'Customer postal code',
          },
          {
            key: 'country',
            type: 'string',
            label: 'Country',
            description: 'Customer country',
          },
          {
            key: 'registrationDate',
            type: 'date',
            label: 'Registration Date',
            description: 'Date when customer registered',
          },
          {
            key: 'lastLoginDate',
            type: 'date',
            label: 'Last Login Date',
            description: "Date of customer's last login",
          },
        ],
        metadata: {
          idPrefix: 'CUST',
        },
      },
      {
        name: 'Orders',
        slug: 'orders',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Order ID',
            description: 'Unique identifier for the order',
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
            key: 'customerId',
            type: 'reference',
            label: 'Customer',
            description: 'Customer who placed the order',
            config: {
              ref: 'customers',
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
            key: 'orderDate',
            type: 'date',
            label: 'Order Date',
            description: 'Date when order was placed',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'status',
            type: 'enum',
            label: 'Status',
            description: 'Current order status',
            config: {
              options: [
                {
                  value: 'pending',
                  label: 'Pending',
                  description: 'Order has been placed but not processed',
                },
                {
                  value: 'processing',
                  label: 'Processing',
                  description: 'Order is being processed',
                },
                {
                  value: 'shipped',
                  label: 'Shipped',
                  description: 'Order has been shipped',
                },
                {
                  value: 'delivered',
                  label: 'Delivered',
                  description: 'Order has been delivered',
                },
                {
                  value: 'cancelled',
                  label: 'Cancelled',
                  description: 'Order has been cancelled',
                },
                {
                  value: 'refunded',
                  label: 'Refunded',
                  description: 'Order has been refunded',
                },
              ],
            },
          },
          {
            key: 'subtotal',
            type: 'number',
            label: 'Subtotal',
            description: 'Order subtotal before tax and shipping',
          },
          {
            key: 'shippingCost',
            type: 'number',
            label: 'Shipping Cost',
            description: 'Cost of shipping',
          },
          {
            key: 'taxAmount',
            type: 'number',
            label: 'Tax Amount',
            description: 'Amount of tax applied to order',
          },
          {
            key: 'totalAmount',
            type: 'number',
            label: 'Total Amount',
            description: 'Total order amount including tax and shipping',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'paymentMethod',
            type: 'enum',
            label: 'Payment Method',
            description: 'Method of payment',
            config: {
              options: [
                {
                  value: 'credit_card',
                  label: 'Credit Card',
                },
                {
                  value: 'paypal',
                  label: 'PayPal',
                },
                {
                  value: 'bank_transfer',
                  label: 'Bank Transfer',
                },
                {
                  value: 'crypto',
                  label: 'Cryptocurrency',
                },
              ],
            },
          },
          {
            key: 'shippingAddress',
            type: 'string',
            label: 'Shipping Address',
            description: 'Full shipping address',
          },
          {
            key: 'billingAddress',
            type: 'string',
            label: 'Billing Address',
            description: 'Full billing address',
          },
          {
            key: 'notes',
            type: 'string',
            label: 'Notes',
            description: 'Additional order notes',
          },
        ],
        metadata: {
          idPrefix: 'ORD',
        },
      },
      {
        name: 'Order Items',
        slug: 'order-items',
        fields: [
          {
            key: 'id',
            type: 'string',
            label: 'Order Item ID',
            description: 'Unique identifier for the order item',
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
            key: 'orderId',
            type: 'reference',
            label: 'Order',
            description: 'Order this item belongs to',
            config: {
              ref: 'orders',
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
            key: 'productId',
            type: 'reference',
            label: 'Product',
            description: 'Product being ordered',
            config: {
              ref: 'products',
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
            key: 'quantity',
            type: 'number',
            label: 'Quantity',
            description: 'Number of items ordered',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'unitPrice',
            type: 'number',
            label: 'Unit Price',
            description: 'Price per unit at time of purchase',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'subtotal',
            type: 'number',
            label: 'Subtotal',
            description: 'Line item subtotal (quantity × unit price)',
          },
          {
            key: 'discountAmount',
            type: 'number',
            label: 'Discount Amount',
            description: 'Amount of discount applied to this item',
          },
        ],
        metadata: {
          idPrefix: 'OI',
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
