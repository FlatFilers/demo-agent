"use strict";

import documents from "./demos/documents";
import dynamic from "./demos/dynamic";
import extractor from "./demos/extractor";
import simple from "./demos/simple";
import theming from "./demos/theming";
import headless from "./demos/headless";
import secrets from "./demos/secrets";
import sidebar from "./demos/sidebar";
import data from "./demos/data";
import namespace from "./demos/namespace";
import metadata from "./demos/metadata";
import egress from "./demos/egress";
import actions from "./demos/actions";

import { Client } from "@flatfile/listener";

export default function (listener: Client) {
  listener.namespace(["space:simple-demo"], simple);
  listener.namespace(["space:theming-demo"], theming);
  listener.namespace(["space:extractor-demo"], extractor);
  listener.namespace(["space:dynamic-demo"], dynamic);
  listener.namespace(["space:documents-demo"], documents);
  listener.namespace(["space:headless-demo"], headless);
  listener.namespace(["space:secrets-demo"], secrets);
  listener.namespace(["space:sidebar-demo"], sidebar);
  listener.namespace(["space:data-demo"], data);
  listener.namespace(["space:namespace-demo"], namespace);
  listener.namespace(["space:metadata-demo"], metadata);
  listener.namespace(["space:egress-demo"], egress);
  listener.namespace(["space:actions-demo"], actions);
}
