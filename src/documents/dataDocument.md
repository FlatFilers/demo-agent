# Process data with Data Hooks

---

Data Hooks® are compact functions that automatically restructure, rectify, validate, and enhance data your data.

These hooks can operate on an entire record, or row, of data through methods on the FlatfileRecord class. Hooks at the record level can utilize all row fields, making them suitable for tasks needing multiple field access or new field creation.

## Things you can do here

1. Enter and first and last name, and watch the email field populate. Notice it is lower case.
2. Enter a last name with a number and see the field get marked as invalid.

## Making this Space

This Space has been configured to use Data Hooks to compute and validate fields in the Contacts Sheet.

Here's a look at the code that was used to create it:

```jsx
import { Client } from "@flatfile/listener";
import { recordHook, FlatfileRecord } from "@flatfile/plugin-record-hook";

export default function flatfileEventListener(listener: Client) {
  listener.use(
    recordHook("contacts", (record: FlatfileRecord) => {
      record.compute(
        "email",
        (email, record) =>
          `${record.get("first_name")}${record.get("last_name")}@gmail.com`,
        "Email was generated from first and last name."
      );

      record.computeIfPresent(
        "email",
        (email) => email?.toString() || "".toLowerCase(),
        "Email was converted to lowercase."
      );

      record.validate(
        "last_name",
        (value) => typeof value === "string" && !/\d/.test(value),
        "Last name cannot contain numbers."
      );
      return record;
    })
  );
}
```

## Further documentation

Read more about how to process data with data hooks <a href="https://flatfile.com/docs/guides/handling-data" target="_blank">here</a>.
## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
