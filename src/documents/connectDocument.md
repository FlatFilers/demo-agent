# Connect via Merge.dev

This is an **alpha release** connect plugin for Merge.dev. Using this plugin will enable you to sync data from hundreds of integrations (connected through Merge.dev) with Flatfile.

## Things you can do here

1. Click the "Add Connection" button in the sidebar to connect a Merge.dev integration.
2. Once the connection is complete, data from Merge.dev will automatically sync to Flatfile.
3. You can re-sync data from Merge.dev at any time by clicking the "Sync" action button on the Workspace.

## Making this space

```js
import type { FlatfileListener } from "@flatfile/listener";
import mergePlugin from "@flatfile/plugin-connect-via-merge";

export default function (listener: FlatfileListener) {
  listener.use(mergePlugin());
}
```

## Further documentation

Read more about how to make connections via Merge.dev <a href="https://github.com/FlatFilers/flatfile-docs-kitchen-sink/blob/main/typescript/connect-alpha/README.md" target="_blank">here</a>.

## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
