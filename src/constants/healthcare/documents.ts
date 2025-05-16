import type { Flatfile } from '@flatfile/api'

export const documents: Flatfile.DocumentConfig[] = [
  {
    title: 'Welcome',
    body: `# Healthcare Records Management System
    
Welcome to the Healthcare Records Management System demo. This system helps healthcare providers manage patient records, prescriptions, medications, and insurance information efficiently and securely.

## Key Features

- **Patient Management**: Store and manage comprehensive patient information.
- **Provider Directory**: Maintain records of healthcare providers and their specializations.
- **Medication Database**: Track medication details, including dosage forms and prescribing information.
- **Prescription Tracking**: Monitor prescriptions from issuance to completion.
- **Facilities Management**: Keep track of hospitals, clinics, and pharmacies in your network.
- **Insurance Plans**: Manage insurance plan details and coverage information.

## Getting Started

1. Upload your data using the Files tab in the sidebar
2. Map your data to the appropriate fields
3. Review and validate your data
4. Export clean, standardized data

This demo showcases how Flatfile can help healthcare organizations maintain accurate patient and prescription records while ensuring data quality and compliance.`,
  },
]
