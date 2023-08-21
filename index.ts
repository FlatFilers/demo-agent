"use strict";

import documents from "./demos/documents";
import dynamic from "./demos/dynamic";
import extractor from "./demos/extractor";
import simple from "./demos/simple";
import theming from "./demos/theming";

import { Client } from "@flatfile/listener";

export default function (listener: Client) {
  listener.namespace(["space:simple"], simple);
  listener.namespace(["space:theming"], theming);
  listener.namespace(["space:extractor"], extractor);
  listener.namespace(["space:dynamic"], dynamic);
  listener.namespace(["space:documents"], documents);
}
