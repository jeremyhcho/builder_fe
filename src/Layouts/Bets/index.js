import Loadable from 'react-loadable'

// Components
import Loading from 'Layouts/Loading'

const GamesLayout = Loadable({
  loader: () => import('./BetsRoute'),
  loading: Loading
})

export default GamesLayout
