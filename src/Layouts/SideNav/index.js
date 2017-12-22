import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

// Components
import Matches from 'Assets/Icons/nav/basketball-13.svg'
import MatchesSelected from 'Assets/Icons/nav/basketball-13-white.svg'
import Search from 'Assets/Icons/nav/m-search.svg'
import SearchSelected from 'Assets/Icons/nav/m-search-white.svg'
import Rocket from 'Assets/Icons/nav/rocket.svg'
import RocketSelected from 'Assets/Icons/nav/rocket-white.svg'
import { Tooltip } from 'Components/Common'

// CSS
import './SideNav.scss'

const navItems = [
  {
    icon: Matches,
    selectedIcon: MatchesSelected,
    route: '/matches',
    key: 'Matches'
  },
  {
    icon: Search,
    selectedIcon: SearchSelected,
    route: '/search',
    key: 'Search'
  },
  {
    icon: Rocket,
    selectedIcon: RocketSelected,
    route: '/rocket',
    key: 'Rocket'
  }
]

class SideNav extends React.Component {
  state = {
    selectedItem: ''
  }

  handleClick = (key, route) => {
    return () => {
      this.setState({
        selectedItem: key
      }, () => {
        this.props.history.push(route)
      })
    }
  }

  render () {
    return (
      <div styleName="sidenav">
        {navItems.map(({ icon: Icon, selectedIcon: SelectedIcon, route, key }) => {
          const selected = route === this.props.history.location.pathname
          const navItemStyle = classNames('nav-item', {
            selected
          })

          return (
            <div
              key={key}
              styleName={navItemStyle}
              onClick={this.handleClick(key, route)}
              selected={selected}
              data-tip-for={`side-nav-item-${key}`}
            >
              <Tooltip id={`side-nav-item-${key}`} pos='right'>{key}</Tooltip>
              {selected ?
                <SelectedIcon height={20} width={20} />
                : <Icon height={20} width={20} />
              }
            </div>
          )
        })}
      </div>
    )
  }
}

SideNav.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(SideNav)
