# Create distinct experiences with namespaces

---

Namespaces provide the ability to limit the extent of influence over Spaces, Workbooks, and Sheets. In situations where you want to differentiate between Flatfile experiences, you can configure your system to react solely when the event aligns with the designated namespaces.

In your Flatfile listener, when you’re monitoring for specific events, you can set your system to only respond if the event matches the assigned namespaces.

## Making this Space

This very Space was configured using a Namespace.

Here's a look at the code that was used to create it:

```jsx
import namespace from "namespace-demo";
import another from "other-demo";

import { Client } from "@flatfile/listener";

export default function (listener: Client) {
  listener.namespace(["space:namespace-demo"], namespace);
  listener.namespace(["space:another-demo"], another);
}
```

Notice that there are two listener configurations here:

- `space:namespace-demo`
- `space:another-demo`

The `space:namespace-demo` was triggered on the creation of this demo, while another demo, under another namespace will create with a different configuration, both running on the same agent

## Further documentation

Read more about narrowing the scope of Spaces, Workbooks, and Sheets <a href="https://flatfile.com/docs/guides/namespaces" target="_blank">here</a>.
## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
