import Loadable from 'react-loadable'

// Components
import { Loading } from 'Components/Common'

const AdminLayout = Loadable({
  loader: () => import('./AdminRoute'),
  loading: Loading
})

import AnnouncementLayout from './AnnouncementLayout'
import PickOfTheDayLayout from './PickOfTheDayLayout'

class AdminLayout extends React.Component {
  componentDidMount () {
    this.props.verifyAdmin()
  }

  componentWillReceiveProps (newProps) {
    const { isAdmin, confirmed } = newProps

    if (!isAdmin && confirmed) {
      this.props.history.push({ pathname: '/' })
    }
  }

  render () {
    const { isAdmin, confirmed } = this.props

    if (!isAdmin && !confirmed) {
      return <div />
    }

    return (
      <Switch>
        <Route path='/admin/announcements' component={AnnouncementLayout} />
        <Route path='/admin/potd' component={PickOfTheDayLayout} />
        <Redirect to='/admin/announcements' from='/admin' />
      </Switch>
    )
  }
}

AdminLayout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  confirmed: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  verifyAdmin: PropTypes.func.isRequired
}

const mapStateToProps = ({ admin }) => ({
  isAdmin: admin.authState.isAdmin,
  confirmed: admin.authState.confirmed,
})

export default AdminLayout
