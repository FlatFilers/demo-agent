# Document Actions

You can enable end users to trigger custom operations from within your Documents using Actions. Add actions to a Document, and they will appear as buttons in the upper right corner of the Document. This Document has been configured with a Submit Action.

```ts
const doc = await api.documents.create(spaceId, {
  title: "Document Actions",
  body: bodyText,
  actions: [
    {
      label: "Submit",
      operation: "contacts:submit",
      description: "Would you like to submit the contact data?",
      tooltip: "Submit the contact data",
      mode: "foreground",
      primary: true,
      confirm: true,
    },
  ],
});
```

[Learn more about document actions in our guides](https://flatfile.com/docs/guides/documents#document-actions).