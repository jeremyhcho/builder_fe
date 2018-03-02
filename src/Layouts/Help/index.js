import Loadable from 'react-loadable'

import Loading from 'Layouts/Loading'

const HelpLayout = Loadable({
  loader: () => import('./HelpRoute'),
  loading: Loading
})

export default HelpLayout
