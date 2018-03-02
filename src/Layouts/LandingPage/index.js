import Loadable from 'react-loadable'

import { Loading } from 'Components/Common'

const LandingPageLayout = Loadable({
  loader: () => import('./LandingPageRoute'),
  loading: Loading
})

export default LandingPageLayout
