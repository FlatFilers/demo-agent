# Try Theming

---

All Spaces are customizable via theming options enabling you to blend Flatfile seamlessly into your application.

This Space has been configured to theme new spaces under the given 'theming-demo' namespace with styling appropriate to a customer company.

```jxs
import api from "@flatfile/api"
import { Client, FlatfileEvent } from "@flatfile/listener"

export default function flatfileEventListener(listener: Client) {
      listener.on(
        "space:created",
    async ({ context: { spaceId, environmentId } }: FlatfileEvent) => {
          await api.spaces.update(spaceId, {
            environmentId,
            metadata: {
              theme: {
                root: {
                  primaryColor: "#74a4a8",
              fontFamily: "Georgia",
              buttonBorderRadius: "5px",
              dangerColor: "#ee7c78",
              warningColor: "#f7bd1d",
              successColor: "#74a4a8",
            },
            sidebar: {
                  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRHD-t5vClnQN7-yiojM4GUl0vT1gK7mnOSw&usqp=CAU",
              textColor: "#ee7c78",
              titleColor: "#202456",
              focusBgColor: "#fbfcfb",
              focusTextColor: "#74a4a8",
              backgroundColor: "white",
              footerTextColor: "#202456",
              borderColor: "#202456",
            },
            document: {
                  borderColor: "#ee7c78",
            },
            table: {
                  fontFamily: "Georgia",
              column: {
                    header: {
                      color: "#ee7c78",
                  backgroundColor: "#fbfcfb",
                },
              },
              indexColumn: {
                    backgroundColor: "#fbfcfb",
                color: "#ee7c78",
                selected: {
                      backgroundColor: "#fef8e8",
                },
              },
              inputs: {
                    checkbox: {
                      color: "#f7bd1d",
                },
              },
            },
          },
        },
      });
    }
  );
}
```

## Further Documentation

Read more about the possible configurations for theming [here](https://flatfile.com/docs/guides/theming).
