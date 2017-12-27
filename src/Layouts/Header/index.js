import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'

// Components
import { MenuItem, IconDropdown } from 'Components/Common'

// CSS
import './Header.scss'

const SECTION_NAMES = {
  '/games': 'Games',
  '/games/:id/:sectionName': 'Game Details',
  '/teams': 'Teams',
  '/teams/:id/:sectionName': 'Team Details',
  '/settings': 'Settings'
}

class Header extends React.Component {
  getCurrentRoute() {
    for (const regexp of Object.keys(SECTION_NAMES)) {
      if (pathToRegexp(regexp).exec(this.props.location.pathname)) {
        return SECTION_NAMES[regexp]
      }
    }

    return null
  }

  navigateSettings = () => {
    this.props.history.push('/settings')
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
              <MenuItem onClick={this.navigateSettings}>
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
  history: PropTypes.object.isRequired
}

export default withRouter(Header)
