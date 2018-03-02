import Loadable from 'react-loadable'

// Components
import Loading from 'Layouts/Loading'

const ModelsLayout = Loadable({
  loader: () => import('./ModelsRoute'),
  loading: Loading
})

export default ModelsLayout
