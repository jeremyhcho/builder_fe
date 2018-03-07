import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

// Actions
import { fetchAdminUsers } from 'Actions'

// Components
import { DocumentTitle, Input } from 'Components/Common'

// CSS
import './Users.scss'

class Users extends React.Component {
  state = {
    search: ''
  }

  componentDidMount () {
    this.props.fetchAdminUsers()
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  filteredUsers () {
    return this.props.users.filter(user => (
      user.email.includes(this.state.search)) || (user.stripe_id || '').includes(this.state.search)
    )
  }

  render () {
    return (
      <DocumentTitle title='Quartz - Admin Users' header='Users'>
        <div styleName='admin-users'>
          <div styleName='toolbar'>
            <Input
              label='Search'
              onChange={this.handleSearch}
              placeholder='Email or Stripe ID'
            />
          </div>

          <ul>
            {
              this.filteredUsers().map(user => (
                <li styleName='user-row' key={user.id}>
                  <div styleName='cell'>
                    <p className='label small'>Email</p>
                    <p
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '350px'
                      }}
                    >
                      {user.email}
                    </p>
                  </div>

                  <div styleName='cell'>
                    <p className='label small'>Stripe ID</p>
                    <p>{user.stripe_id || '-'}</p>
                  </div>

                  <div styleName='cell'>
                    <p className='label small'>Subscription ID</p>
                    <p>{user.active_sub_id || '-'}</p>
                  </div>

                  <div styleName='cell'>
                    <p className='label small'>Created</p>
                    <p>{moment.utc(new Date(user.created_at)).format('M/D/YY')}</p>
                  </div>

                  <div styleName='cell'>
                    <p className='label small'>Subscription End</p>
                    <p>
                      {
                        user.subscription_end ? (
                          moment.utc(new Date(user.subscription_end)).format('M/D/YY')
                        ) : '-'
                      }
                    </p>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </DocumentTitle>
    )
  }
}

Users.defaultProps = {
  users: []
}

Users.propTypes = {
  users: PropTypes.array,
  fetchAdminUsers: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  users: routines.admin.users
})

const mapDispatchToProps = {
  fetchAdminUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
