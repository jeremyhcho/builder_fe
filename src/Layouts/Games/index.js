import Loadable from 'react-loadable'

// Components
import { Loading } from 'Components/Common'

const GamesLayout = Loadable({
  loader: () => import('./GamesRoute'),
  loading: Loading
})

export default GamesLayout
