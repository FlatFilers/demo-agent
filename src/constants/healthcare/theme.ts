export const theme = {
  root: {
    primaryColor: '#007089', // Teal-blue: Professional and calming
    dangerColor: '#D94646', // Medical alert red
    warningColor: '#FFC34D', // Amber/gold: Attention but not emergency
    successColor: '#49A75E', // Medical green
    textColor: '#333333',
    backgroundColor: '#FFFFFF',
    borderColor: '#E0EDF1',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  sidebar: {
    logo: 'https://assets.flatfile.io/images/logos/healthcare-icon.png',
    backgroundColor: '#F5FBFD', // Very light blue
    textColor: '#333333',
    titleColor: '#333333',
    focusBgColor: '#EBF5F8',
    focusTextColor: '#007089',
    width: 'narrow',
  },
  table: {
    fontFamily: 'Inter, system-ui, sans-serif',
    inputs: {
      checkbox: {
        color: '#007089',
        borderColor: '#C4D9E2',
      },
    },
    column: {
      header: {
        backgroundColor: '#EBF5F8',
        color: '#333333',
      },
    },
    cell: {
      active: {
        borderWidth: '2px',
        borderShadow: '0 0 0 1px rgba(0, 112, 137, 0.2)',
      },
    },
    borderColor: '#E0EDF1',
  },
  logo: {
    mode: 'dark',
  },
  email: {
    logo: 'https://assets.flatfile.io/images/logos/healthcare-logo.png',
    textColor: '#333333',
    titleColor: '#007089',
    buttonBgColor: '#007089',
    buttonTextColor: '#FFFFFF',
    footerTextColor: '#666666',
    backgroundColor: '#F5FBFD',
    darkMode: {
      textColor: '#FFFFFF',
      titleColor: '#4DB0C8',
      buttonBgColor: '#007089',
      buttonTextColor: '#FFFFFF',
      footerTextColor: '#CCCCCC',
      backgroundColor: '#1A1A1A',
    },
  },
}
