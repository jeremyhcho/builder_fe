import Loadable from 'react-loadable'

// Components
import { Loading } from 'Components/Common'

const AdminLayout = Loadable({
  loader: () => import('./AdminRoute'),
  loading: Loading
})

export default AdminLayout
