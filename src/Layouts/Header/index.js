import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

// Components
import { MenuItem, IconDropdown } from 'Components/Common'

// CSS
import './Header.scss'

// const routes = {
//   '/matches': 'Games',
//   '/matches/:id': 'Game Details'
// }

const Header = ({ location }) => {
  console.log(location.pathname)
  return (
    <div styleName='header'>
      <div styleName='header-content'>
        <div styleName='title'>
          <h1 className="semibold">Games</h1>
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

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(Header)
