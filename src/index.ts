"use strict";

import actions from "./demos/actions";
import data from "./demos/data";
import documents from "./demos/documents";
import dynamic from "./demos/dynamic";
import egress from "./demos/egress";
import extractor from "./demos/extractor";
// import headless from "./demos/headless";
import metadata from "./demos/metadata";
import namespace from "./demos/namespace";
// import secrets from "./demos/secrets";
import sidebar from "./demos/sidebar";
import simple from "./demos/simple";
import theming from "./demos/theming";

import { Client } from "@flatfile/listener";

export default function (listener: Client) {
  listener.namespace(["space:actions-demo"], actions);
  listener.namespace(["space:data-demo"], data);
  listener.namespace(["space:documents-demo"], documents);
  listener.namespace(["space:dynamic-demo"], dynamic);
  listener.namespace(["space:egress-demo"], egress);
  listener.namespace(["space:extractor-demo"], extractor);
  // listener.namespace(["space:headless-demo"], headless);
  listener.namespace(["space:metadata-demo"], metadata);
  listener.namespace(["space:namespace-demo"], namespace);
  // listener.namespace(["space:secrets-demo"], secrets);
  listener.namespace(["space:sidebar-demo"], sidebar);
  listener.namespace(["space:simple-demo"], simple);
  listener.namespace(["space:theming-demo"], theming);
}
