import Loadable from 'react-loadable'

// Components
import { Loading } from 'Components/Common'

const DashboardLayout = Loadable({
  loader: () => import('./DashboardRoute'),
  loading: Loading
})

export default DashboardLayout
