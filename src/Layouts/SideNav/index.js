import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

// Components
import { Tooltip } from 'Components/Common'

// Icons
import Game from 'Assets/Icons/nav/basketball-13.svg'
import GameSelected from 'Assets/Icons/nav/basketball-13-white.svg'
import Search from 'Assets/Icons/nav/m-search.svg'
import SearchSelected from 'Assets/Icons/nav/m-search-white.svg'
import Rocket from 'Assets/Icons/nav/rocket.svg'
import RocketSelected from 'Assets/Icons/nav/rocket-white.svg'

// CSS
import './SideNav.scss'

const navItems = [
  {
    icon: Game,
    selectedIcon: GameSelected,
    route: '/games',
    key: 'games',
    sectionName: 'Games'
  },
  {
    icon: Search,
    selectedIcon: SearchSelected,
    route: '/teams',
    key: 'teams',
    sectionName: 'Teams'
  },
  {
    icon: Rocket,
    selectedIcon: RocketSelected,
    route: '/rocket',
    key: 'rocket',
    sectionName: 'Rocket'
  }
]

class SideNav extends React.Component {
  state = {
    selectedItem: ''
  }

  handleClick = (key, route) => {
    const { history } = this.props

    return () => {
      this.setState({
        selectedItem: key
      }, () => {
        history.push(route)
      })
    }
  }

  render () {
    return (
      <div styleName="sidenav">
        {navItems.map(({ icon: Icon, selectedIcon: SelectedIcon, route, key, sectionName }) => {
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
              <Tooltip id={`side-nav-item-${key}`} pos='right'>{sectionName}</Tooltip>
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
  history: PropTypes.object.isRequired,
}

export default withRouter(SideNav)
