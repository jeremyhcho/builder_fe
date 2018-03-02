import Loadable from 'react-loadable'

import { Loading } from 'Components/Common'

const HelpLayout = Loadable({
  loader: () => import('./HelpRoute'),
  loading: Loading
})

export default HelpLayout
