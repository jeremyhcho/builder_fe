import Loadable from 'react-loadable'

// Components
import Loading from 'Layouts/Loading'

const AdminLayout = Loadable({
  loader: () => import('./AdminRoute'),
  loading: Loading
})

export default AdminLayout
