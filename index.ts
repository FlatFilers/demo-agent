"use strict";

import documents from "./demos/documents";
import dynamic from "./demos/dynamic";
import extractor from "./demos/extractor";
import simple from "./demos/simple";
import theming from "./demos/theming";

import { Client } from "@flatfile/listener";

export default function (listener: Client) {
  listener.namespace(["space:simple-demo"], simple);
  listener.namespace(["space:theming-demo"], theming);
  listener.namespace(["space:extractor-demo"], extractor);
  listener.namespace(["space:dynamic-demo"], dynamic);
  listener.namespace(["space:documents-demo"], documents);
}
