import Loadable from 'react-loadable'

// Components
import Loading from 'Layouts/Loading'

const SettingsLayout = Loadable({
  loader: () => import('./SettingsRoute'),
  loading: Loading
})

export default SettingsLayout
