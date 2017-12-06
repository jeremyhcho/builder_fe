import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { AkNavigationItem } from '@atlaskit/navigation'

/**
 * [NavItem description]
 * @param string path [endpoint required]
 * @extends React
 */

class NavItem extends React.Component {
  handleClick = () => {
    if (this.props.path.length) {
      this.props.history.push(this.props.path)
    }
  }

  render () {
    const { path, ...navProps } = this.props
    return (
      <AkNavigationItem
        onClick={this.handleClick}
        isSelected={this.props.path === this.props.history.location.pathname}
        {...navProps}
      />
    )
  }
}

NavItem.propTypes = {
  history: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
}

export default withRouter(NavItem)
