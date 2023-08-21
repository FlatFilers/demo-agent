# Try Auto-Extraction

---

Any file uploaded to Flatfile needs to be extracted from it's original format.

Flatfile's Extractor Plugins make this easy. Whether your incoming data is \`.json\`, \`.xlsx\`, \`.zip\` or any of a multitude of others, simply configure your Listener to use one or more extractor plugins and extraction will be handled automatically upon file upload.

This Space has been configured to use several extractor plugins.

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

They appropriate plugin will extract data automatically. Once extraction is complete, you can import and map your data into your workbook and it's ready for use.

## Further Documentation

Read more about the possible configurations for each plugin [here](https://flatfile.com/docs/plugins/extractors/).
