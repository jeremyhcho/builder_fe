import Loadable from 'react-loadable'

// Components
import Loading from 'Layouts/Loading'

const DashboardLayout = Loadable({
  loader: () => import('./DashboardRoute'),
  loading: Loading
})

export default DashboardLayout
