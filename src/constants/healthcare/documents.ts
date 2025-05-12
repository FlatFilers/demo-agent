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
  {
    title: 'Data Model',
    body: `# Healthcare Data Model

Our healthcare records system is built around the following key entities:

## Patients
The Patients sheet contains essential information about the individuals receiving healthcare services:
- **Patient ID**: Unique identifier for each patient
- **Personal Information**: Name, date of birth, gender, contact information
- **Insurance Details**: Insurance ID for coverage verification
- **Provider Relationship**: Link to primary care provider

## Providers
The Providers sheet stores information about healthcare professionals:
- **Provider ID**: Unique identifier for each healthcare provider
- **Personal Information**: Name, contact details
- **Credentials**: Medical license number, specialization
- **Facility**: The primary facility where they practice

## Facilities
The Facilities sheet tracks healthcare locations:
- **Facility ID**: Unique identifier for each facility
- **Facility Details**: Name, type, contact information, address
- Types include hospitals, clinics, pharmacies, laboratories, and imaging centers

## Medications
The Medications sheet maintains a database of available medications:
- **Medication ID**: Unique identifier for each medication
- **Medication Details**: Brand name, generic name, drug class
- **Formulation Information**: Dosage form, strength, manufacturer
- **Prescription Requirements**: Whether a prescription is required

## Prescriptions
The Prescriptions sheet tracks medication orders:
- **Prescription ID**: Unique identifier for each prescription
- **Relationships**: Patient, provider, and medication IDs
- **Timing Information**: Issue date, start/end dates
- **Dosing Details**: Dosage, frequency, quantity, refills
- **Status Tracking**: Active, completed, cancelled, or on hold

## Insurance Plans
The Insurance Plans sheet contains information about available healthcare coverage:
- **Plan ID**: Unique identifier for each insurance plan
- **Plan Details**: Provider, name, type
- **Coverage Information**: Start/end dates, deductible, copay
- **Prescription Coverage**: Whether the plan covers medications

This data model enables comprehensive tracking of healthcare records while maintaining appropriate relationships between entities.`,
  },
  {
    title: 'Data Requirements',
    body: `# Data Requirements and Validation

To ensure data quality in your healthcare records system, please follow these requirements:

## Patient Records

- **Patient ID**: Must be unique and follow your organization's ID format
- **Name**: First and last name are required
- **Date of Birth**: Must be in YYYY-MM-DD format
- **Contact Information**: Email and/or phone number should be provided
- **Primary Provider ID**: Should correspond to a valid provider in the system

## Provider Records

- **Provider ID**: Must be unique and follow your organization's ID format
- **Name**: First and last name are required
- **License Number**: Must be provided and valid for the provider's jurisdiction
- **Facility ID**: Should correspond to a valid facility in the system

## Facility Records

- **Facility ID**: Must be unique and follow your organization's ID format
- **Name and Type**: Required for all facilities
- **Address Information**: Complete address required, including city, state, and ZIP code

## Medication Records

- **Medication ID**: Must be unique and follow your organization's ID format
- **Name**: Both brand name and generic name should be provided when applicable
- **Drug Information**: Drug class, dosage form, and strength are required
- **Prescription Requirement**: Must be specified for regulatory compliance

## Prescription Records

- **Prescription ID**: Must be unique and follow your organization's ID format
- **Related IDs**: Patient ID, Provider ID, and Medication ID must exist in the system
- **Dates**: Issue date is required; start and end dates should be provided when applicable
- **Dosing Information**: Dosage, frequency, and quantity are required
- **Status**: Must be accurately maintained to reflect the current state of the prescription

## Insurance Plan Records

- **Plan ID**: Must be unique and follow your organization's ID format
- **Provider and Plan Name**: Required for all insurance plans
- **Coverage Dates**: Start and end dates must be provided in YYYY-MM-DD format
- **Financial Information**: Deductible and copay amounts should be provided in USD

## Data Validation

The system performs the following validations:
- Format checking for IDs, dates, and standardized fields
- Referential integrity validation between related entities
- Completeness checks for required fields
- Logical validation (e.g., start dates before end dates)

Maintaining clean, accurate data is essential for patient safety, regulatory compliance, and effective healthcare management.`,
  },
  {
    title: 'Implementation Guide',
    body: `# Implementation Guide

Follow these steps to implement the Healthcare Records Management System in your organization:

## 1. Prepare Your Data

Before uploading to the system, ensure your data follows these guidelines:

- **Format**: Prepare CSV files for each entity (patients, providers, medications, etc.)
- **Headers**: Include column headers that match or closely relate to the system fields
- **Required Fields**: Ensure all required fields have values
- **Relationships**: Verify that related IDs exist across your datasets
- **Standardization**: Standardize formats for dates (YYYY-MM-DD), phone numbers, and addresses

## 2. Upload and Map Your Data

- Use the Files tab to upload your prepared CSV files
- During the mapping process, match your columns to the appropriate system fields
- Review field requirements and data types to ensure proper mapping
- Set up any necessary transformations for data standardization

## 3. Validate and Clean Data

- Review validation results in the data grid
- Address any errors or warnings flagged by the system
- Use bulk operations to fix common issues
- Verify relationships between entities

## 4. Configure System Settings

- Set up user roles and permissions based on job responsibilities
- Configure notification preferences
- Establish data retention policies in compliance with regulations
- Set up regular data backup schedules

## 5. Train Users

- Provide training on data entry standards
- Educate staff on validation requirements
- Establish procedures for maintaining data accuracy
- Create documentation for common tasks and troubleshooting

## 6. Ongoing Maintenance

- Regularly audit data for completeness and accuracy
- Update medication records as new drugs enter the market
- Archive outdated insurance plans
- Perform periodic data quality checks

## 7. Compliance Considerations

- Ensure your implementation meets HIPAA requirements
- Follow state-specific regulations for prescription record keeping
- Maintain appropriate access controls and audit trails
- Implement data encryption for sensitive information

By following this implementation guide, you can ensure a smooth transition to the Healthcare Records Management System while maintaining data integrity and compliance.`,
  },
]
