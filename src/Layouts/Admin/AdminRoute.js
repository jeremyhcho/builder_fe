import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { verifyAdmin } from 'Actions'

// Components
import AnnouncementLayout from './AnnouncementLayout'
import PickOfTheDayLayout from './PickOfTheDayLayout'
import AdminDashboard from 'Components/Admin/Dashboard'
import UsersLayout from './UsersLayout'

class AdminRoute extends React.Component {
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
        <Route exact path='/admin' component={AdminDashboard} />
        <Route path='/admin/announcements' component={AnnouncementLayout} />
        <Route path='/admin/potd' component={PickOfTheDayLayout} />
        <Route path='/admin/users' component={UsersLayout} />
      </Switch>
    )
  }
}

AdminRoute.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  confirmed: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  verifyAdmin: PropTypes.func.isRequired
}

const mapStateToProps = ({ admin }) => ({
  isAdmin: admin.authState.isAdmin,
  confirmed: admin.authState.confirmed,
})

const mapDispatchToProps = {
  verifyAdmin
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRoute)
