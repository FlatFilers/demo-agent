# Customize what your guests see in their sidebar

---

Flatfile allows you to update your Sidebar to hide or show certain elements.

By combining the customizable Sidebar functionality with the power to dynamically create and update Spaces, narrowing your scope with Namespaces, you can create different experiences for different sets of users.

## Things you can do here

Invite guest (or yourself at an alias) and log into this Space as that user. The Sidebar will be hidden.

## Making this Space

This Space has been configured to hide the Sidebar on the left for any guests you invite to this Space.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import { sidebarDocument } from "../constants/documents.json";
import simpleWorkbook from "../constants/workbook.json";

export default function flatfileEventListener(listener: Client) {
  listener.filter({ job: "space:configure" }, (configure: FlatfileListener) => {
    configure.on(
      "job:ready",
      async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
        try {
          await api.jobs.ack(jobId, {
            info: "Job started.",
            progress: 10,
          });

          const spaceUpdateParams = {
            metadata: {
              sidebarConfig: {
                showSidebar: false,
              },
            },
          };

          await api.spaces.update(spaceId, spaceUpdateParams);

          await api.jobs.complete(jobId, {
            outcome: {
              message: "Job completed.",
            },
          });
        } catch (error: any) {
          console.error("Error: ", error.stack);

          await api.jobs.fail(jobId, {
            outcome: {
              message: "Job error.",
            },
          });
        }
      }
    );
  });
}

```

## Further documentation

Read more about configuring what your guests see in their sidebar <a href="https://flatfile.com/docs/guides/guest_sidebar" target="_blank">here</a>.
## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
