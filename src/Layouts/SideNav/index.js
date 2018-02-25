import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

// Components
import { Tooltip, QuartzLink } from 'Components/Common'

// Icons
import Games from 'Assets/Icons/nav/games.svg'
import GamesSelected from 'Assets/Icons/nav/gamesSelected.svg'
import Teams from 'Assets/Icons/nav/teams.svg'
import TeamsSelected from 'Assets/Icons/nav/teamsSelected.svg'
import PlaceholderIcon from 'Assets/Icons/white-q-1.svg'
import Dashboard from 'Assets/Icons/nav/dashboard.svg'
import DashboardSelected from 'Assets/Icons/nav/dashboardSelected.svg'
import Models from 'Assets/Icons/nav/model.svg'
import ModelsSelected from 'Assets/Icons/nav/modelSelected.svg'

// CSS
import './SideNav.scss'

const navItems = [
  {
    icon: Dashboard,
    selectedIcon: DashboardSelected,
    route: '/dashboard',
    key: 'dashboard',
    sectionName: 'Dashboard'
  },
  {
    icon: Games,
    selectedIcon: GamesSelected,
    route: '/games',
    key: 'games',
    sectionName: 'Games'
  },
  {
    icon: Teams,
    selectedIcon: TeamsSelected,
    route: '/teams',
    key: 'teams',
    sectionName: 'Teams'
  },
  {
    icon: Models,
    selectedIcon: ModelsSelected,
    route: '/models',
    key: 'models',
    sectionName: 'Models'
  }
]

class SideNav extends React.Component {
  state = {
    selectedItem: ''
  }

  handleClick = (key) => {
    return () => {
      this.setState({
        selectedItem: key
      })
    }
  }

  render () {
    return (
      <div styleName="sidenav">
        <div
          styleName="logo"
          onClick={() => this.props.history.push({ pathname: '/dashboard' })}
        >
          <PlaceholderIcon
            width={25}
            height={25}
          />
        </div>

        {
          navItems.map(({ icon: Icon, selectedIcon: SelectedIcon, route, key, sectionName }) => {
            const selected = route === this.props.history.location.pathname
            const navItemStyle = classNames('nav-item', {
              selected
            })

            return (
              <QuartzLink to={`${route}`} onClick={this.handleClick(key)} key={key}>
                <div
                  styleName={navItemStyle}
                  selected={selected}
                  data-tip-for={`side-nav-item-${key}`}
                >
                  <Tooltip id={`side-nav-item-${key}`} pos='right'>{sectionName}</Tooltip>
                  {selected ?
                    <SelectedIcon height={20} width={20} />
                    : <Icon height={20} width={20} />
                  }
                </div>
              </QuartzLink>
            )
          })
        }
      </div>
    )
  }
}

SideNav.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(SideNav)
