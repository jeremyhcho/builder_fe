import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// CSS
import './SideNav.scss'

class NavigationItem extends React.Component {
  handleClick = () => {
    if (this.props.path.length) {
      this.props.history.push(this.props.path)
    }
  }

  render () {
    const { text, icon } = this.props
    return (
      <div styleName="nav item" onClick={this.handleClick}>
        <img src={icon} style={{ width: '40px', height: '40px' }} />
        <p>{text}</p>
      </div>
    )
  }
}

NavigationItem.defaultProps = {
  text: '',
  icon: null,
  path: ''
}

NavigationItem.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  path: PropTypes.string,
  history: PropTypes.object.isRequired
}

export default withRouter(NavigationItem)
