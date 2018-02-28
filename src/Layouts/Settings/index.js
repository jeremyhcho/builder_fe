import Loadable from 'react-loadable'

// Components
import { Loading } from 'Components/Common'

const SettingsLayout = Loadable({
  loader: () => import('./SettingsRoute'),
  loading: Loading
})

export default SettingsLayout
