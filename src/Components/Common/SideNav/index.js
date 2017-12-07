import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './SideNav.scss'

class SideNav extends React.Component {
  render () {
    return (
      <div styleName="sidenav">
        SIDENAV
      </div>
    )
  }
}

SideNav.defaultProps = {
}

SideNav.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SideNav
