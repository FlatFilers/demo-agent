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