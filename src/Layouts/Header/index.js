import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

// Components
import { MenuItem, IconDropdown } from 'Components/Common'

// CSS
import './Header.scss'

class Header extends React.Component {
  getCurrentRoute() {
    const { location } = this.props
    const path = location.pathname.split('/').slice(1)
    if (path[0] === 'matches' && path.length === 1) {
      return 'Games'
    }
    if (path[0] === 'matches' && !isNaN(path[1])) {
      return 'Game Details'
    }
    return 'Admin'
  }

  render () {
    return (
      <div styleName='header'>
        <div styleName='header-content'>
          <div styleName='title'>
            <h1 className="semibold">{this.getCurrentRoute()}</h1>
          </div>
          <div styleName='header-items'>
            <IconDropdown
              icon={<i className="fa fa-user-o" aria-hidden="true" />}
            >
              <MenuItem onClick={() => console.log('CLICKED')}>
                Settings
              </MenuItem>
            </IconDropdown>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(Header)
