export { workbookConfig, themeConfig };

const themeConfig = {
  metadata: {
    theme: {
      root: {
        primaryColor: "#090B2B",
        dangerColor: "#F44336",
        warningColor: "#FF9800",
      },
      document: {
        borderColor: "#CAD0DC",
      },
      sidebar: {
        logo: "https://images.ctfassets.net/hjneo4qi4goj/5DNClD4reUBKoF7u01OgKF/2aa12c49c5ea97bac013a7546e453738/flatfile-white.svg",
        textColor: "#ECEEFF",
        titleColor: "#C4C9FF",
        focusBgColor: "#6673FF",
        focusTextColor: "#FFF",
        backgroundColor: "#090B2B",
        footerTextColor: "#C4C9FF",
        textUltralightColor: "#B9DDFF",
        borderColor: "#2E3168",
        activeTextColor: "#FFF",
      },
      table: {},
    },
    sidebarConfig: {
      showGuestInvite: true,
      showDataChecklist: true,
      showSidebar: true,
    },
  },
};

const contactsSheet = {
  name: "Contacts",
  slug: "contacts",
  fields: [
    {
      key: "first_name",
      type: "string",
      label: "First Name",
      description: "The first name",
      constraints: [
        {
          type: "required",
        },
      ],
    },
    {
      key: "last_name",
      type: "string",
      label: "Last Name",
      description: "The last name",
    },
    {
      key: "email",
      type: "string",
      label: "Email",
      description: "The person's email",
      constraints: [
        {
          type: "unique",
        },
      ],
    },
    {
      key: "phone",
      type: "string",
      label: "Phone Number",
      description: "The person's phone number",
    },
    {
      key: "dateOfBirth",
      type: "date",
      label: "Date of Birth",
      description: "The person's birth date",
    },
    {
      key: "age",
      type: "number",
      label: "Age",
      description: "The number of years since the person's birth date",
      constraints: [
        {
          type: "computed",
        },
      ],
    },
    {
      key: "country",
      label: "Country",
      description: "The formatted country code",
      type: "reference",
      config: {
        ref: "countries",
        key: "code",
        relationship: "has-one",
      },
    },
    {
      key: "postalCode",
      type: "string",
      label: "Postal Code",
      description: "Zip or Postal Code",
    },
    {
      key: "subscriber",
      type: "boolean",
      label: "Subscriber?",
      description: "Whether the person is already a subscriber",
    },
    {
      key: "type",
      type: "enum",
      label: "Deal Status",
      description: "The deal status",
      config: {
        options: [
          {
            value: "new",
            label: "New",
            description:
              "This deal is pretty new so not clear where it will go",
          },
          {
            value: "interested",
            label: "Interested",
            description: "The other party is interested! Promising",
          },
          {
            value: "meeting",
            label: "Meeting",
            description: "An initial meeting has been set up, very exciting.",
          },
          {
            value: "opportunity",
            label: "Opportunity",
            description: "Looks like this is a legit opportunity!",
          },
          {
            value: "unqualified",
            label: "Not a fit",
            description: "It didn't work out. Too bad.",
          },
        ],
      },
    },
  ],
  actions: [
    {
      operation: "contacts:create-json",
      label: "Create JSON",
      description: "Would you like to create a JSON file?",
      icon: "ThreeRectangles",
      mode: "foreground",
      primary: false,
      requireSelection: true,
      //confirm: true,
    },
  ],
};

const countriesSheet = {
  name: "Countries",
  slug: "countries",
  fields: [
    {
      key: "code",
      type: "string",
      label: "Country Code",
      description: "The standardized country code",
      constraints: [
        {
          type: "required",
        },
        {
          type: "unique",
        },
      ],
    },
    {
      key: "name",
      type: "string",
      label: "Full name",
      description: "The full name of the country",
    },
    {
      key: "currency",
      type: "string",
      label: "Currency",
      description: "The currency predominantly used in the country",
    },
  ],
};

const workbookConfig = {
  name: "All Contacts",
  labels: ["Primary"],
  sheets: [contactsSheet, countriesSheet],
  actions: [
    {
      operation: "submitActionFg",
      mode: "foreground",
      label: "Submit",
      type: "string",
      description: "Submit Data",
      primary: true,
    },
  ],
};
