import type { Flatfile } from '@flatfile/api'

export const workbooks: Flatfile.CreateWorkbookConfig[] = [
  {
    name: 'Healthcare Workbook',
    sheets: [
      {
        name: 'Patients',
        slug: 'patients',
        fields: [
          {
            key: 'patientId',
            type: 'string',
            label: 'Patient ID',
            description: 'Unique identifier for the patient',
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
            key: 'email',
            type: 'string',
            label: 'Email',
            description: 'Patient email address',
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
            description: 'Patient first name',
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
            description: 'Patient last name',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'dateOfBirth',
            type: 'date',
            label: 'Date of Birth',
            description: 'Patient date of birth',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'gender',
            type: 'enum',
            label: 'Gender',
            description: 'Patient gender',
            config: {
              options: [
                {
                  value: 'M',
                  label: 'Male',
                },
                {
                  value: 'F',
                  label: 'Female',
                },
                {
                  value: 'O',
                  label: 'Other',
                },
                {
                  value: 'P',
                  label: 'Prefer not to say',
                },
              ],
            },
          },
          {
            key: 'phone',
            type: 'string',
            label: 'Phone Number',
            description: 'Patient phone number',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'address',
            type: 'string',
            label: 'Address',
            description: 'Patient street address',
          },
          {
            key: 'city',
            type: 'string',
            label: 'City',
            description: 'Patient city',
          },
          {
            key: 'state',
            type: 'string',
            label: 'State/Province',
            description: 'Patient state or province',
          },
          {
            key: 'zipCode',
            type: 'string',
            label: 'Zip/Postal Code',
            description: 'Patient zip or postal code',
          },
          {
            key: 'country',
            type: 'string',
            label: 'Country',
            description: 'Patient country',
          },
          {
            key: 'emergencyContactName',
            type: 'string',
            label: 'Emergency Contact Name',
            description: 'Name of emergency contact',
          },
          {
            key: 'emergencyContactPhone',
            type: 'string',
            label: 'Emergency Contact Phone',
            description: 'Phone number of emergency contact',
          },
          {
            key: 'primaryProviderId',
            type: 'reference',
            label: 'Primary Provider',
            description: "Patient's primary healthcare provider",
            config: {
              ref: 'providers',
              key: 'providerId',
              relationship: 'has-one',
            },
          },
          {
            key: 'insuranceId',
            type: 'reference',
            label: 'Insurance Plan',
            description: "Patient's insurance plan",
            config: {
              ref: 'insurance-plans',
              key: 'planId',
              relationship: 'has-one',
            },
          },
          {
            key: 'registrationDate',
            type: 'date',
            label: 'Registration Date',
            description: 'Date when patient was registered',
          },
          {
            key: 'allergies',
            type: 'string',
            label: 'Allergies',
            description: 'Patient allergies',
          },
          {
            key: 'medicalConditions',
            type: 'string',
            label: 'Medical Conditions',
            description: 'Patient medical conditions',
          },
          {
            key: 'bloodType',
            type: 'enum',
            label: 'Blood Type',
            description: 'Patient blood type',
            config: {
              options: [
                { value: 'a_positive', label: 'A+' },
                { value: 'a_negative', label: 'A-' },
                { value: 'b_positive', label: 'B+' },
                { value: 'b_negative', label: 'B-' },
                { value: 'ab_positive', label: 'AB+' },
                { value: 'ab_negative', label: 'AB-' },
                { value: 'o_positive', label: 'O+' },
                { value: 'o_negative', label: 'O-' },
                { value: 'unknown', label: 'Unknown' },
              ],
            },
          },
        ],
      },
      {
        name: 'Providers',
        slug: 'providers',
        fields: [
          {
            key: 'providerId',
            type: 'string',
            label: 'Provider ID',
            description: 'Unique identifier for the provider',
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
                  idPrefix: 'DR',
                },
              },
            ],
          },
          {
            key: 'email',
            type: 'string',
            label: 'Email',
            description: 'Provider email address',
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
            description: 'Provider first name',
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
            description: 'Provider last name',
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
            description: 'Medical license number',
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
            key: 'specialization',
            type: 'enum',
            label: 'Specialization',
            description: 'Medical specialization',
            config: {
              options: [
                { value: 'primary_care', label: 'Primary Care' },
                { value: 'cardiology', label: 'Cardiology' },
                { value: 'dermatology', label: 'Dermatology' },
                { value: 'endocrinology', label: 'Endocrinology' },
                { value: 'gastroenterology', label: 'Gastroenterology' },
                { value: 'neurology', label: 'Neurology' },
                { value: 'obstetrics_gynecology', label: 'Obstetrics/Gynecology' },
                { value: 'oncology', label: 'Oncology' },
                { value: 'ophthalmology', label: 'Ophthalmology' },
                { value: 'orthopedics', label: 'Orthopedics' },
                { value: 'pediatrics', label: 'Pediatrics' },
                { value: 'psychiatry', label: 'Psychiatry' },
                { value: 'radiology', label: 'Radiology' },
                { value: 'urology', label: 'Urology' },
                { value: 'other', label: 'Other' },
              ],
            },
          },
          {
            key: 'phone',
            type: 'string',
            label: 'Phone',
            description: 'Provider phone number',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'facilityId',
            type: 'reference',
            label: 'Primary Facility',
            description: 'Primary medical facility where provider practices',
            config: {
              ref: 'facilities',
              key: 'facilityId',
              relationship: 'has-one',
            },
          },
          {
            key: 'licenseNumber',
            type: 'string',
            label: 'License Number',
            description: 'Medical license number',
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
            key: 'licenseState',
            type: 'string',
            label: 'License State',
            description: 'State where medical license was issued',
          },
          {
            key: 'deaNumber',
            type: 'string',
            label: 'DEA Number',
            description: 'Drug Enforcement Administration number',
          },
          {
            key: 'bio',
            type: 'string',
            label: 'Biography',
            description: 'Professional biography',
          },
          {
            key: 'startDate',
            type: 'date',
            label: 'Start Date',
            description: 'Date when provider started practice',
          },
        ],
      },
      {
        name: 'Medical Facilities',
        slug: 'facilities',
        fields: [
          {
            key: 'facilityId',
            type: 'string',
            label: 'Facility ID',
            description: 'Unique identifier for the medical facility',
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
                  idPrefix: 'FAC',
                },
              },
            ],
          },
          {
            key: 'name',
            type: 'string',
            label: 'Facility Name',
            description: 'Name of the medical facility',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'type',
            type: 'enum',
            label: 'Facility Type',
            description: 'Type of medical facility',
            config: {
              options: [
                { value: 'hospital', label: 'Hospital' },
                { value: 'clinic', label: 'Clinic' },
                { value: 'pharmacy', label: 'Pharmacy' },
                { value: 'laboratory', label: 'Laboratory' },
                { value: 'imaging_center', label: 'Imaging Center' },
                { value: 'nursing_home', label: 'Nursing Home' },
                { value: 'urgent_care', label: 'Urgent Care' },
                { value: 'rehabilitation', label: 'Rehabilitation Center' },
                { value: 'other', label: 'Other' },
              ],
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'address',
            type: 'string',
            label: 'Address',
            description: 'Street address of the facility',
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
            description: 'City where the facility is located',
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
            description: 'State or province where the facility is located',
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
            description: 'Zip or postal code of the facility',
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
            description: 'Country where the facility is located',
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
            description: 'Main contact phone number',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'email',
            type: 'string',
            label: 'Email',
            description: 'Main contact email address',
          },
          {
            key: 'website',
            type: 'string',
            label: 'Website',
            description: 'Facility website URL',
          },
          {
            key: 'facilityLicenseNumber',
            type: 'string',
            label: 'Facility License Number',
            description: 'License number for the facility',
            constraints: [
              {
                type: 'unique',
              },
            ],
          },
          {
            key: 'openDate',
            type: 'date',
            label: 'Open Date',
            description: 'Date when facility opened',
          },
          {
            key: 'hours',
            type: 'string',
            label: 'Operating Hours',
            description: 'Facility operating hours',
          },
        ],
      },
      {
        name: 'Medications',
        slug: 'medications',
        fields: [
          {
            key: 'medicationId',
            type: 'string',
            label: 'Medication ID',
            description: 'Unique identifier for the medication',
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
                  idPrefix: 'MED',
                },
              },
            ],
          },
          {
            key: 'name',
            type: 'string',
            label: 'Medication Name',
            description: 'Name of the medication',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'genericName',
            type: 'string',
            label: 'Generic Name',
            description: 'Generic name of the medication',
          },
          {
            key: 'ndc',
            type: 'string',
            label: 'NDC Code',
            description: 'National Drug Code',
            constraints: [
              {
                type: 'unique',
              },
            ],
          },
          {
            key: 'manufacturer',
            type: 'string',
            label: 'Manufacturer',
            description: 'Company that manufactures the medication',
          },
          {
            key: 'drugClass',
            type: 'string',
            label: 'Drug Class',
            description: 'Classification of the medication',
          },
          {
            key: 'dosageForm',
            type: 'enum',
            label: 'Dosage Form',
            description: 'Form of the medication',
            config: {
              options: [
                { value: 'tablet', label: 'Tablet' },
                { value: 'capsule', label: 'Capsule' },
                { value: 'liquid', label: 'Liquid' },
                { value: 'injection', label: 'Injection' },
                { value: 'patch', label: 'Patch' },
                { value: 'cream', label: 'Cream' },
                { value: 'ointment', label: 'Ointment' },
                { value: 'inhaler', label: 'Inhaler' },
                { value: 'suppository', label: 'Suppository' },
                { value: 'drops', label: 'Drops' },
                { value: 'other', label: 'Other' },
              ],
            },
          },
          {
            key: 'strength',
            type: 'string',
            label: 'Strength',
            description: 'Strength of the medication (e.g., 500mg)',
          },
          {
            key: 'schedule',
            type: 'enum',
            label: 'Controlled Substance Schedule',
            description: 'DEA schedule classification if applicable',
            config: {
              options: [
                { value: 'schedule_i', label: 'Schedule I' },
                { value: 'schedule_ii', label: 'Schedule II' },
                { value: 'schedule_iii', label: 'Schedule III' },
                { value: 'schedule_iv', label: 'Schedule IV' },
                { value: 'schedule_v', label: 'Schedule V' },
                { value: 'not_controlled', label: 'Not Controlled' },
              ],
            },
          },
          {
            key: 'requiresPriorAuth',
            type: 'boolean',
            label: 'Requires Prior Authorization',
            description: 'Whether the medication requires prior authorization from insurance',
            config: {
              allowIndeterminate: true,
            },
          },
          {
            key: 'commonInstructions',
            type: 'string',
            label: 'Common Instructions',
            description: 'Common instructions for administering the medication',
          },
          {
            key: 'sideEffects',
            type: 'string',
            label: 'Side Effects',
            description: 'Common side effects of the medication',
          },
          {
            key: 'interactions',
            type: 'string',
            label: 'Interactions',
            description: 'Known drug interactions',
          },
          {
            key: 'approvalDate',
            type: 'date',
            label: 'FDA Approval Date',
            description: 'Date when medication was approved by the FDA',
          },
          {
            key: 'requiresPrescription',
            type: 'boolean',
            label: 'Requires Prescription',
            description: 'Whether the medication requires a prescription',
            config: {
              allowIndeterminate: true,
            },
          },
        ],
      },
      {
        name: 'Prescriptions',
        slug: 'prescriptions',
        fields: [
          {
            key: 'prescriptionId',
            type: 'string',
            label: 'Prescription ID',
            description: 'Unique identifier for the prescription',
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
                  idPrefix: 'RX',
                },
              },
            ],
          },
          {
            key: 'patientId',
            type: 'reference',
            label: 'Patient',
            description: 'Patient receiving the prescription',
            config: {
              ref: 'patients',
              key: 'patientId',
              relationship: 'has-one',
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'providerId',
            type: 'reference',
            label: 'Provider',
            description: 'Provider who prescribed the medication',
            config: {
              ref: 'providers',
              key: 'providerId',
              relationship: 'has-one',
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'medicationId',
            type: 'reference',
            label: 'Medication',
            description: 'Prescribed medication',
            config: {
              ref: 'medications',
              key: 'medicationId',
              relationship: 'has-one',
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'facilityId',
            type: 'reference',
            label: 'Facility',
            description: 'Facility where prescription was written',
            config: {
              ref: 'facilities',
              key: 'facilityId',
              relationship: 'has-one',
            },
          },
          {
            key: 'dosage',
            type: 'string',
            label: 'Dosage',
            description: 'Prescribed dosage',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'frequency',
            type: 'string',
            label: 'Frequency',
            description: 'How often medication should be taken',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'duration',
            type: 'string',
            label: 'Duration',
            description: 'Length of time prescription should be taken',
          },
          {
            key: 'quantity',
            type: 'number',
            label: 'Quantity',
            description: 'Quantity of medication prescribed',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'refills',
            type: 'number',
            label: 'Refills',
            description: 'Number of refills allowed',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'dispenseAsWritten',
            type: 'boolean',
            label: 'Dispense As Written',
            description: 'Whether prescription must be dispensed as written with no substitutions',
            config: {
              allowIndeterminate: true,
            },
          },
          {
            key: 'issueDate',
            type: 'date',
            label: 'Issue Date',
            description: 'Date when prescription was written',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'fillDate',
            type: 'date',
            label: 'Fill Date',
            description: 'Date when prescription was filled',
          },
          {
            key: 'expirationDate',
            type: 'date',
            label: 'Expiration Date',
            description: 'Date when prescription expires',
          },
          {
            key: 'instructions',
            type: 'string',
            label: 'Special Instructions',
            description: 'Special instructions for taking medication',
          },
          {
            key: 'status',
            type: 'enum',
            label: 'Status',
            description: 'Current status of the prescription',
            config: {
              options: [
                { value: 'active', label: 'Active' },
                { value: 'filled', label: 'Filled' },
                { value: 'partial_fill', label: 'Partially Filled' },
                { value: 'completed', label: 'Completed' },
                { value: 'expired', label: 'Expired' },
                { value: 'cancelled', label: 'Cancelled' },
                { value: 'on_hold', label: 'On Hold' },
              ],
            },
          },
          {
            key: 'notes',
            type: 'string',
            label: 'Notes',
            description: 'Additional notes about the prescription',
          },
        ],
      },
      {
        name: 'Insurance Plans',
        slug: 'insurance-plans',
        fields: [
          {
            key: 'planId',
            type: 'string',
            label: 'Plan ID',
            description: 'Unique identifier for the insurance plan',
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
                  idPrefix: 'INS',
                },
              },
            ],
          },
          {
            key: 'name',
            type: 'string',
            label: 'Plan Name',
            description: 'Name of the insurance plan',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'insuranceProvider',
            type: 'string',
            label: 'Insurance Provider',
            description: 'Company providing the insurance',
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'planType',
            type: 'enum',
            label: 'Plan Type',
            description: 'Type of insurance plan',
            config: {
              options: [
                { value: 'hmo', label: 'HMO' },
                { value: 'ppo', label: 'PPO' },
                { value: 'epo', label: 'EPO' },
                { value: 'pos', label: 'POS' },
                { value: 'hdhp', label: 'HDHP' },
                { value: 'medicare', label: 'Medicare' },
                { value: 'medicaid', label: 'Medicaid' },
                { value: 'tricare', label: 'Tricare' },
                { value: 'other', label: 'Other' },
              ],
            },
            constraints: [
              {
                type: 'required',
              },
            ],
          },
          {
            key: 'groupNumber',
            type: 'string',
            label: 'Group Number',
            description: 'Insurance group number',
          },
          {
            key: 'formularyLevel',
            type: 'enum',
            label: 'Formulary Level',
            description: 'Level of drug formulary coverage',
            config: {
              options: [
                { value: 'tier_1', label: 'Tier 1 (Generic)' },
                { value: 'tier_2', label: 'Tier 2 (Preferred Brand)' },
                { value: 'tier_3', label: 'Tier 3 (Non-Preferred Brand)' },
                { value: 'tier_4', label: 'Tier 4 (Specialty)' },
                { value: 'custom', label: 'Custom Formulary' },
              ],
            },
          },
          {
            key: 'annualDeductible',
            type: 'number',
            label: 'Annual Deductible',
            description: 'Annual deductible amount in USD',
          },
          {
            key: 'copayPrimary',
            type: 'number',
            label: 'Primary Care Copay',
            description: 'Copay amount for primary care visits in USD',
          },
          {
            key: 'copaySpecialist',
            type: 'number',
            label: 'Specialist Copay',
            description: 'Copay amount for specialist visits in USD',
          },
          {
            key: 'copayEmergency',
            type: 'number',
            label: 'Emergency Room Copay',
            description: 'Copay amount for emergency room visits in USD',
          },
          {
            key: 'coinsurance',
            type: 'number',
            label: 'Coinsurance Percentage',
            description: 'Coinsurance percentage',
          },
          {
            key: 'outOfPocketMax',
            type: 'number',
            label: 'Out-of-Pocket Maximum',
            description: 'Maximum out-of-pocket expenses in USD',
          },
          {
            key: 'requiresPriorAuth',
            type: 'boolean',
            label: 'Requires Prior Authorization',
            description: 'Whether the plan requires prior authorization for services',
            config: {
              allowIndeterminate: true,
            },
          },
          {
            key: 'effectiveDate',
            type: 'date',
            label: 'Effective Date',
            description: 'Date when plan coverage begins',
          },
          {
            key: 'expirationDate',
            type: 'date',
            label: 'Expiration Date',
            description: 'Date when plan coverage ends',
          },
          {
            key: 'notes',
            type: 'string',
            label: 'Notes',
            description: 'Additional notes about the insurance plan',
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
