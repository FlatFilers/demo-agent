import type { FlatfileListener } from '@flatfile/listener'
import actions from './demos/actions'
import connect from './demos/connect'
import data from './demos/data'
import documents from './demos/documents'
import dynamic from './demos/dynamic'
import egress from './demos/egress'
import extractor from './demos/extractor'
import headless from './demos/headless'
import localization from './demos/localization'
import metadata from './demos/metadata'
import namespaceListener from './demos/namespace'
import secrets from './demos/secrets'
import sidebar from './demos/sidebar'
import simple from './demos/simple'
import theming from './demos/theming'

export default function (listener: FlatfileListener) {
  listener.namespace(['space:actions-demo'], actions)
  listener.namespace(['space:data-demo'], data)
  listener.namespace(['space:documents-demo'], documents)
  listener.namespace(['space:dynamic-demo'], dynamic)
  listener.namespace(['space:egress-demo'], egress)
  listener.namespace(['space:extractor-demo'], extractor)
  listener.namespace(['space:headless-demo'], headless)
  listener.namespace(['space:localization-demo'], localization)
  listener.namespace(['space:metadata-demo'], metadata)
  listener.namespace(['space:namespace-demo'], namespaceListener)
  listener.namespace(['space:secrets-demo'], secrets)
  listener.namespace(['space:sidebar-demo'], sidebar)
  listener.namespace(['space:simple-demo'], simple)
  listener.namespace(['space:theming-demo'], theming)
  listener.namespace(['space:connect-demo'], connect)
}
