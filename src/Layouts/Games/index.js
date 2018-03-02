import Loadable from 'react-loadable'

// Components
import Loading from 'Layouts/Loading'

const GamesLayout = Loadable({
  loader: () => import('./GamesRoute'),
  loading: Loading
})

export default GamesLayout
