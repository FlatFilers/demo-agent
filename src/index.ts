"use strict";
import api from "@flatfile/api";

import actions from "./demos/actions";
import connect from "./demos/connect";
import data from "./demos/data";
import documents from "./demos/documents";
import dynamic from "./demos/dynamic";
import egress from "./demos/egress";
import extractor from "./demos/extractor";
import headless from "./demos/headless";
import localization from "./demos/localization";
import metadata from "./demos/metadata";
import namespaceListener from "./demos/namespace";
import secrets from "./demos/secrets";
import sidebar from "./demos/sidebar";
import simple from "./demos/simple";
import theming from "./demos/theming";

import { Client } from "@flatfile/listener";

export default function (listener: Client) {
  listener.namespace(["space:actions-demo"], actions)
  listener.namespace(["space:data-demo"], data)
  listener.namespace(["space:documents-demo"], documents)
  listener.namespace(["space:dynamic-demo"], dynamic)
  listener.namespace(["space:egress-demo"], egress)
  listener.namespace(["space:extractor-demo"], extractor)
  listener.namespace(["space:headless-demo"], headless)
  listener.namespace(["space:localization-demo"], localization)
  listener.namespace(["space:metadata-demo"], metadata)
  listener.namespace(["space:namespace-demo"], namespaceListener)
  listener.namespace(["space:secrets-demo"], secrets)
  listener.namespace(["space:sidebar-demo"], sidebar)
  listener.namespace(["space:simple-demo"], simple)
  listener.namespace(["space:theming-demo"], theming)
  listener.namespace(["space:connect-demo"], connect)
  // Temp workaround until we solve for new namespace pattern
  listener.on("**", async (event) => {
    const { context: { spaceId }, namespace } = event
    const { data: { labels }} = await api.spaces.get(spaceId)
    if (namespace[0] === 'space:custom-app') {
      if (labels!.includes("actions-demo")) { actions(listener) }
      if (labels!.includes("data-demo")) { data(listener) }
      if (labels!.includes("documents-demo")) { documents(listener) }
      if (labels!.includes("dynamic-demo")) { dynamic(listener) }
      if (labels!.includes("egress-demo")) { egress(listener) }
      if (labels!.includes("extractor-demo")) { extractor(listener) }
      if (labels!.includes("headless-demo")) { headless(listener) }
      if (labels!.includes("localization-demo")) { localization(listener) }
      if (labels!.includes("metadata-demo")) { metadata(listener) }
      if (labels!.includes("namespace-demo")) { namespaceListener(listener) }
      if (labels!.includes("secrets-demo")) { secrets(listener) }
      if (labels!.includes("sidebar-demo")) { sidebar(listener) }
      if (labels!.includes("simple-demo")) { simple(listener) }
      if (labels!.includes("theming-demo")) { theming(listener) }
      if (labels!.includes("connect-demo")) { connect(listener) }
    }
  })
}
