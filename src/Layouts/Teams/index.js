import Loadable from 'react-loadable'

// Components
import Loading from 'Layouts/Loading'

const TeamsLayout = Loadable({
  loader: () => import('./TeamsRoute'),
  loading: Loading
})

export default TeamsLayout
