# Customize the look and feel of Flatfile to match your brand

---

All Spaces are customizable via theming options enabling you to blend Flatfile seamlessly into your application.

## Things you can do here

Set the sidebar theme straight from the configurations worksheet! Simply select a theme, then select "More Actions", "Update Theme".\
The listener configured behind this space will get information about your selection and make a call to update your sidebar theme.

## Making this Space

This Space has been configured to leverage the visual overrides available to help you theme a Space.\
We've customized the colors and logo in this Space to match a sample brand but you can very easily update all of the elements you see to a different aesthetic to match yours.\
Even better? Create co-branded experiences in all of your Spaces for every one of your customers.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { FlatfileEvent } from "@flatfile/listener";

export default function flatfileEventListener(listener: FlatfileListener) {
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

Read more about how to customize the look and feel of Flatfile to match your brand <a href="https://flatfile.com/docs/guides/theming" target="_blank">here</a>

## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
