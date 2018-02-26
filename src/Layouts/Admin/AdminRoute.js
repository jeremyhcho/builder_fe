import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { verifyAdmin } from 'Actions'

// Components
import {
  Announcements,
  CreateAnnouncement,
  EditAnnouncement
} from 'Components/Admin'

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
        <Route exact path='/admin/announcements' component={Announcements} />
        <Route exact path='/admin/announcements/new' component={CreateAnnouncement} />
        <Route exact path='/admin/announcements/edit/:id' component={EditAnnouncement} />
        <Redirect to='/admin/announcements' from='/admin' />
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
