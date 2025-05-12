# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup and Development
- **Install dependencies**: `npm install`
- **Run development server**: `npx flatfile develop` or `npm run dev`
- **Run development with environment variables**:
  - Local: `npm run dev:local`
  - Staging: `npm run dev:staging`
  - Production: `npm run dev:prod`

### Building and Deployment
- **Build the project**: `npm run build`
- **Build documents only**: `npm run documents`
- **Build bundles only**: `npm run bundle`
- **Deploy the project**: `npm run deploy`
- **Deploy with specific environment**:
  - Local: `npm run deploy:local`
  - Staging: `npm run deploy:staging`
  - Production: `npm run deploy:prod`

### Listing and Managing Deployments
- **List deployments**: `npm run list`
- **List with specific environment**:
  - Local: `npm run list:local`
  - Staging: `npm run list:staging`
  - Production: `npm run list:prod`
- **Delete deployments**: `npm run delete`
- **Delete with specific environment**:
  - Local: `npm run delete:local`
  - Staging: `npm run delete:staging`
  - Production: `npm run delete:prod`

### Code Quality
- **Check code quality**: `npm run check` (runs Biome linting + TypeScript type checking)
- **Fix code issues**: `npm run fix` (automatically fixes Biome issues)

### Document Management
- When updating documents, add/update files in `src/documents/` and run `npm run build`

## Architecture

This repository contains a demo agent for Flatfile, showcasing various features and industry-specific implementations.

### Core Components

1. **Main Entry Point**: The `src/index.ts` file defines a default listener that registers various namespaced demo listeners.

2. **Demo Modules**: Each demo is implemented as a separate module in the `src/demos` directory. These modules demonstrate different Flatfile features:
   - Actions, data handling, dynamic configurations
   - Document management
   - Extractors for different file formats
   - Theming and UI customization
   - Industry-specific implementations

3. **Industry Demos**: The repository includes several industry-specific demos (ecommerce, healthcare, real estate), each with their own:
   - Workbook definitions
   - Custom themes
   - Document configurations
   - Sample data files

4. **Plugin Usage**: The demo agent leverages various Flatfile plugins:
   - `@flatfile/plugin-automap` for automatic field mapping
   - `@flatfile/plugin-record-hook` for data transformation and validation
   - `@flatfile/plugin-space-configure` for space configuration
   - Extractors for various file formats (XLSX, JSON, XML, ZIP)

5. **Event-Driven Architecture**: The application uses Flatfile's event listener pattern, where different modules register handlers for specific events within their namespaces.

When making changes, ensure to maintain the structure of the demo implementations and follow the pattern established for creating new demo spaces or industry configurations.

## Creating New Industry Demos

To implement a new industry-specific demo, follow these steps:

### 1. Plan Your Industry Data Model

1. Identify the main data entities (3-6 is ideal)
2. Define the fields and their types for each entity
3. Establish relationships between entities 
4. Plan sample data files with realistic examples

### 2. Set Up Directory Structure

```bash
mkdir -p src/constants/your-industry
mkdir -p src/files/your-industry
touch src/constants/your-industry/workbooks.ts
touch src/constants/your-industry/theme.ts
touch src/constants/your-industry/documents.ts
```

### 3. Create Sample CSV Files

Create realistic, anonymized CSV files for each entity in your data model in `src/files/your-industry/`.

### 4. Define Workbooks (workbooks.ts)

This file defines your entities (as sheets) with their fields, constraints, and relationships:

```typescript
import type { Flatfile } from "@flatfile/api";

export const workbooks: Flatfile.CreateWorkbookConfig[] = [
  {
    name: "Your Industry Workbook",
    sheets: [
      {
        name: "Entity Name",
        slug: "entity-slug",
        fields: [
          {
            key: "id",
            type: "string",
            label: "ID",
            description: "Unique identifier",
            constraints: [
              { type: "required" },
              { type: "unique" },
            ],
          },
          // Add more fields (string, number, date, enum, boolean, reference)
        ],
        metadata: {
          idPrefix: "PREFIX", // Used in validation (src/demos/industry.ts)
        },
      },
      // Add more entity sheets
    ],
    actions: [
      {
        operation: "submitActionFg",
        mode: "foreground",
        label: "Submit",
        type: "string",
        description: "Submit Data",
        primary: true,
      },
      {
        operation: "export-workbook",
        mode: "foreground",
        label: "Export Workbook",
        type: "string",
        description: "Export Workbook",
      },
    ],
  },
];
```

### 5. Create a Theme (theme.ts)

Define a theme with colors appropriate for your industry:

```typescript
export const theme = {
  root: {
    primaryColor: "#4F46E5", // Choose industry-appropriate color
    textColor: "#1F2937",
    dangerColor: "#EF4444",
    warningColor: "#F59E0B",
    successColor: "#10B981",
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  sidebar: {
    logo: "https://path-to-your-industry-logo.png",
    backgroundColor: "#F9FAFB",
    textColor: "#1F2937",
    titleColor: "#1F2937",
    focusBgColor: "#F3F4F6",
    focusTextColor: "#4F46E5",
    width: "narrow",
  },
  // Additional theming elements
};
```

### 6. Create Documentation (documents.ts)

Create helpful explanatory documents for your industry demo:

```typescript
import type { Flatfile } from "@flatfile/api";

export const documents: Flatfile.DocumentConfig[] = [
  {
    title: "Welcome",
    body: `# Welcome to the Your Industry Data Import Demo
    
    This demo showcases how Flatfile can streamline data import for your industry.
    
    ## Key Features
    
    - **Automatic field mapping** - Recognizes standard data formats
    - **Data validation** - Ensures data meets industry requirements
    - **Reference validation** - Verifies relationships between entities
    
    ## Sample Files
    
    We've provided sample files to demonstrate the experience:
    - Entity 1 - Contains information about...
    - Entity 2 - Contains information about...
    `,
    treatments: [],
  },
  // Add more documents to explain different aspects of your industry
];
```

### 7. Update Industry Config

Add your industry to the `industryConfig` array in `src/demos/industryConfig.ts`:

```typescript
import { documents as yourIndustryDocuments } from '../constants/your-industry/documents'
import { theme as yourIndustryTheme } from '../constants/your-industry/theme'
import { workbooks as yourIndustryWorkbooks } from '../constants/your-industry/workbooks'

// Add to the industryConfig array
export const industryConfig: IndustryDemo[] = [
  // Existing industries...
  {
    name: "Your Industry Name",
    slug: "your-industry",
    workbook: yourIndustryWorkbooks,
    theme: yourIndustryTheme,
    documents: yourIndustryDocuments,
    files: [
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/your-industry/entity1.csv',
      'https://github.com/FlatFilers/demo-agent/raw/refs/heads/main/src/files/your-industry/entity2.csv',
      // Add more files
    ],
    automap: {
      sheetSlug: "primary-entity-slug", // Main entity for automapping
      matchFilename: /^.*primary-entity\.csv$/, // Regex to match filename
    },
  },
];
```

### 8. Testing Your Implementation

1. Build the project with `npm run build`
2. Run the development server with `npm run dev`
3. Navigate to your industry demo space to verify all components are working correctly
4. Test uploading sample files and the automapping functionality
5. Verify that data validation works as expected

### 9. Implementation Checklist

- [ ] Workbook structure with appropriate sheets and fields
- [ ] Field types and constraints properly configured
- [ ] References between entities established
- [ ] Theme created with appropriate industry colors
- [ ] Documents created with helpful information
- [ ] Sample data files prepared and tested
- [ ] Industry added to industryConfig config

The standard industry demo pattern includes field validation (especially for dates and IDs with specific prefixes), automapping configuration, and export functionality. Follow the existing industry implementations as templates for your new industry demo.