# Try Theming

---

All Spaces are customizable via theming options enabling you to blend Flatfile seamlessly into your application.

## Making this Space

This Space has been configured to leverage the visual overrides available to help you theme a Space. We've customized the colors and logo in this Space to match a sample brand but you can very easily update all of the elements you see to a different aesthetic to match yours. Even better? Create co-branded experiences in all of your Spaces for every one of your customers.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { Client, FlatfileEvent } from "@flatfile/listener";

export default function flatfileEventListener(listener: Client) {
  listener.on(
    "space:created",
    async ({ context: { spaceId, environmentId } }: FlatfileEvent) => {
      await api.spaces.update(spaceId, {
        environmentId,
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
              logo: "path/to/logo/file",
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
      });
    }
  );
}
```

## Further documentation

Read more about the possible configurations for theming [here](https://flatfile.com/docs/guides/theming).

## Additional examples

- [Documents Example](https://platform.flatfile.com/getting-started)
- [Dynamic Example](https://platform.flatfile.com/getting-started)
- [Extractors Example](https://platform.flatfile.com/getting-started)
- [Theming Example](https://platform.flatfile.com/getting-started)
