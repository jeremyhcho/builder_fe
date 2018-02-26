import Loadable from 'react-loadable'

// Components
import { Loading } from 'Components/Common'

const TeamsLayout = Loadable({
  loader: () => import('./TeamsRoute'),
  loading: Loading
})

export default TeamsLayout
