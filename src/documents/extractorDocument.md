# Extract your data no matter the source

---

The Flatfile Platform is a powerful tool for working with your data. But first, your data has to be available to work with.

Making existing data available in Flatfile is simple: upload, extract, map.

Extraction is the process of unpacking data from its original format to the Flatfile Platform. Whether your incoming data is `.json`, `.xlsx`, `.zip`, or a multitude of others extraction can be automated via the use of Plugins. Simply configure your Listener to use one or more extractor plugins and extraction will be handled automatically upon file upload.

## Things you can do here

To see these work, simply upload a supported file under the "Files" tab.

- [XLSX Data](https://github.com/FlatFilers/demo-agent/tree/main/src/files/movies.xlsx)
- [JSON Data](https://github.com/FlatFilers/demo-agent/tree/main/src/files/movies.json)

The appropriate plugin will extract data automatically. Once extraction is complete, you can import and map your data into a workbook and it's ready for use.

## Making this Space

This Space has been configured to use several extractor plugins.

Here's a look at the code that was used to create it:

```jsx
import { Client, FlatfileListener } from "@flatfile/listener";

import { JSONExtractor } from "@flatfile/plugin-json-extractor";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { XMLExtractor } from "@flatfile/plugin-xml-extractor";
import { ZipExtractor } from "@flatfile/plugin-zip-extractor";

export default function flatfileEventListener(listener: Client) {
  listener.use(JSONExtractor());
  listener.use(ExcelExtractor());
  listener.use(XMLExtractor());
  listener.use(ZipExtractor());
}
```

## Further documentation

Read more about extractor plugins <a href="https://flatfile.com/docs/plugins/extractors" target="_blank">here</a>.
## Learn more about Flatfile by trying our [other demos](https://platform.flatfile.com/getting-started)
