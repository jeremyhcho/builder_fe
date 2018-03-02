import Loadable from 'react-loadable'

import Loading from 'Layouts/Loading'

const LandingPageLayout = Loadable({
  loader: () => import('./LandingPageRoute'),
  loading: Loading
})

export default LandingPageLayout
