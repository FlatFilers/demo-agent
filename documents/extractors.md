# Try Auto-Extraction

---

The Flatfile Platform is a powerful tool for working with your Data. But first your data has to be available to work with. Making existing data available in Flatfile is simple: upload, extract, map.

Extraction is the process of extracting data from it's original format to the Flatfile Platform. Whether your incoming data is `.json`, `.xlsx`, `.zip` or a multitude of others extraction can be automated via the use Plugins. Simply configure your Listener to use one or more extractor plugins and extraction will be handled automatically upon file upload.

## Making this space

This Space has been configured to use several extractor plugins.

Here's a look at the code that was used to create it:

```jsx
import { Client, FlatfileListener } from "@flatfile/listener";

import { DelimiterExtractor } from "@flatfile/plugin-delimiter-extractor";
import { JSONExtractor } from "@flatfile/plugin-json-extractor";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { XMLExtractor } from "@flatfile/plugin-xml-extractor";
import { ZipExtractor } from "@flatfile/plugin-zip-extractor";

export default function flatfileEventListener(listener: Client) {
  listener.use(JSONExtractor());
  listener.use(ExcelExtractor());
  listener.use(XMLExtractor());
  listener.use(DelimiterExtractor("txt", { delimiter: "~" }));
  listener.use(ZipExtractor());
}
```

To see them work, simply upload a supported file.

They appropriate plugin will extract data automatically. Once extraction is complete, you can import and map your data into a workbook and it's ready for use.

## Further documentation

Read more about the possible configurations for each plugin [here](https://flatfile.com/docs/plugins/extractors/).

## Additional examples

- [Documents Example](https://platform.flatfile.com/examples)
- [Dynamic Example](https://platform.flatfile.com/examples)
- [Simple Example](https://platform.flatfile.com/examples)
- [Theming Example](https://platform.flatfile.com/examples)
