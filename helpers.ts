import * as fs from "fs";
import * as path from "path";

export { readDocument, workbookConfig, themeConfig };

const readDocument = function (filePath: string): string {
  return fs.readFileSync(path.join(filePath), "utf-8");
};

const blue = "#202456";
const green = "#74a4a8";
const warning = "#f7bd1d";
const danger = "#ee7c78";
const font = "Georgia";
const greenBgColor = "#fbfcfb";
const yellowBgColor = "#fef8e8";

const themeConfig = {
  metadata: {
    theme: {
      root: {
        primaryColor: green,
        fontFamily: font,
        buttonBorderRadius: "5px",
        dangerColor: danger,
        warningColor: warning,
        successColor: green,
      },
      sidebar: {
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRHD-t5vClnQN7-yiojM4GUl0vT1gK7mnOSw&usqp=CAU",
        textColor: danger,
        titleColor: blue,
        focusBgColor: greenBgColor,
        focusTextColor: green,
        backgroundColor: "white",
        footerTextColor: blue,
        borderColor: blue,
      },
      document: {
        borderColor: danger,
      },
      table: {
        fontFamily: font,
        column: {
          header: {
            color: danger,
            backgroundColor: greenBgColor,
          },
        },
        indexColumn: {
          backgroundColor: greenBgColor,
          color: danger,
          selected: {
            backgroundColor: yellowBgColor,
          },
        },
        inputs: {
          checkbox: {
            color: warning,
          },
        },
      },
    },
  },
};

const workbookConfig = {
  name: "All Contacts",
  labels: ["Primary"],
  sheets: [
    {
      name: "Local Contacts",
      slug: "contacts",
      fields: [
        {
          key: "firstName",
          type: "string",
          label: "First Name",
        },
        {
          key: "lastName",
          type: "string",
          label: "Last Name",
        },
        {
          key: "email",
          type: "string",
          label: "Email",
        },
      ],
    },
    {
      name: "Regional Contacts",
      slug: "contacts",
      fields: [
        {
          key: "firstName",
          type: "string",
          label: "First Name",
        },
        {
          key: "lastName",
          type: "string",
          label: "Last Name",
        },
        {
          key: "email",
          type: "string",
          label: "Email",
        },
      ],
    },
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
  ],
};
