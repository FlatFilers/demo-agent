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
  // If namespace is not space:demo but label is, then run demo
  listener.on("**", async (event) => {
    const { context: { spaceId }, namespace } = event
    const { data: { labels }} = await api.spaces.get(spaceId)
    if (!namespace!.includes('space:actions-demo') && labels!.includes("actions-demo")) { actions(listener) }
    if (!namespace!.includes('space:data-demo') && labels!.includes("data-demo")) { data(listener) }
    if (!namespace!.includes('space:documents-demo') && labels!.includes("documents-demo")) { documents(listener) }
    if (!namespace!.includes('space:dynamic-demo') && labels!.includes("dynamic-demo")) { dynamic(listener) }
    if (!namespace!.includes('space:egress-demo') && (labels!.includes("egress-demo"))) { egress(listener) }
    if (!namespace!.includes('space:extractor-demo') && labels!.includes("extractor-demo")) { extractor(listener) }
    if (!namespace!.includes('space:headless-demo') && labels!.includes("headless-demo")) { headless(listener) }
    if (!namespace!.includes('space:localization-demo') && labels!.includes("localization-demo")) { localization(listener) }
    if (!namespace!.includes('space:metadata-demo') && labels!.includes("metadata-demo")) { metadata(listener) }
    if (!namespace!.includes('space:namespace-demo') && labels!.includes("namespace-demo")) { namespaceListener(listener) }
    if (!namespace!.includes('space:secrets-demo') && labels!.includes("secrets-demo")) { secrets(listener) }
    if (!namespace!.includes('space:sidebar-demo') && labels!.includes("sidebar-demo")) { sidebar(listener) }
    if (!namespace!.includes('space:simple-demo') && labels!.includes("simple-demo")) { simple(listener) }
    if (!namespace!.includes('space:theming-demo') && labels!.includes("theming-demo")) { theming(listener) }
    if (!namespace!.includes('space:connect-demo') && labels!.includes("connect-demo")) { connect(listener) }
  })
}