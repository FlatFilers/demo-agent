export const theme = {
  // Main real estate brand color palette
  root: {
    primaryColor: '#2A6563', // Dark teal - primary brand color
    secondaryColor: '#F0BC5E', // Gold accent - secondary brand color
    dangerColor: '#D15050', // Red - error states
    warningColor: '#F0BC5E', // Gold - warning states
    successColor: '#4CAF50', // Green - success states
    infoColor: '#49799E', // Blue - info states
    backgroundColor: '#F7F6F3', // Light cream - background
    textColor: '#333333', // Dark gray - text
    borderColor: '#D9D4CB', // Light gray - borders
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  sidebar: {
    logo: 'https://via.placeholder.com/200x60?text=Real+Estate+Demo',
    textColor: '#FFFFFF',
    backgroundColor: '#2A6563',
    activeTextColor: '#FFFFFF',
    activeBackgroundColor: '#173F3D',
    headerTextColor: '#FFFFFF',
    headerBackgroundColor: '#173F3D',
    borderColor: '#173F3D',
    logoBackgroundColor: '#FFFFFF',
  },
  table: {
    borderColor: '#E8E2D4',
    headerBackgroundColor: '#F0F0F0',
    headerTextColor: '#2A6563',
    fontFamily: 'Inter, system-ui, sans-serif',
    inputs: {
      checkbox: {
        color: '#2A6563',
        borderColor: '#D9D4CB',
      },
      radio: {
        color: '#2A6563',
        borderColor: '#D9D4CB',
      },
      select: {
        borderColor: '#D9D4CB',
      },
    },
    cell: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E8E2D4',
      textColor: '#333333',
      hoverBackgroundColor: '#F9F7F4',
    },
    column: {
      borderColor: '#E8E2D4',
    },
  },
  email: {
    logo: 'https://via.placeholder.com/200x60?text=Real+Estate+Demo',
    textColor: '#333333',
    buttonColor: '#2A6563',
    buttonTextColor: '#FFFFFF',
    backgroundColor: '#F7F6F3',
    footerColor: '#E8E2D4',
    footerTextColor: '#666666',
    darkMode: {
      textColor: '#FFFFFF',
      buttonColor: '#F0BC5E',
      buttonTextColor: '#333333',
      backgroundColor: '#1C1C1C',
      footerColor: '#2E2E2E',
      footerTextColor: '#CCCCCC',
    },
  },
  // Additional components maintained from original theme
  modal: {
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
  },
  tooltip: {
    backgroundColor: '#333333',
    textColor: '#FFFFFF',
  },
  button: {
    primaryBackgroundColor: '#2A6563',
    primaryTextColor: '#FFFFFF',
    dangerBackgroundColor: '#D15050',
    dangerTextColor: '#FFFFFF',
    secondaryBackgroundColor: '#F0BC5E',
    secondaryTextColor: '#333333',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E2D4',
    textColor: '#333333',
    headerBackgroundColor: '#F7F6F3',
    headerTextColor: '#2A6563',
  },
}
