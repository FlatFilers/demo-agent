import type { Flatfile } from '@flatfile/api'

export const documents: Flatfile.DocumentConfig[] = [
  {
    title: 'Welcome',
    body: "# Welcome to your Ecommerce Workbook!\n\n## This workbook is designed to help you manage your online store data.\n\nInside, you'll find sheets for managing:\n\n- **Products:** Keep track of your product catalog, including details like SKUs, names, descriptions, prices, inventory, and more.\n- **Categories:** Organize your products into categories for better navigation and management.\n- **Customers:** Manage your customer database, including contact information and order history.\n- **Orders:** Track all customer orders, including order details, status, payment, and shipping information.\n- **Order Items:** View the specific items included in each order.\n\n## Getting Started:\n\n1. **Explore the Sheets:** Familiarize yourself with the different sheets and their columns.\n2. **Import Your Data:** Use Flatfile's import capabilities to populate the sheets with your existing e-commerce data. Several example files are provided for each sheet.\n3. **Manage and Validate:** Leverage the built-in data validation and transformation features to ensure your data is accurate and consistent.\n\nHappy Flatfiling!",
  },
]
