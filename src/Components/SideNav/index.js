import React from 'react'
import { Link } from 'react-router-dom'

// Components
import { Dropdown } from 'Components/Common'
import Navigation, {
  AkNavigationItemGroup,
  AkNavigationItem,
  AkContainerTitle,
  AkGlobalItem,
  // AkContainerNavigationNested
} from '@atlaskit/navigation'

class SideNav extends React.Component {
  state = {
    isOpen: true,
    searchDrawerOpen: false
  }

  onResize = ({ isOpen }) => {
    this.setState({ isOpen })
  }

  render() {
    const settings = (
      <Dropdown
        appearance="tall"
        items={[
          {
            heading: 'Settings',
            items: [
              { content: 'Account Settings' },
              { content: 'Help' },
              { content: 'Logout' },
              { content: 'FAQ' }
            ]
          }
        ]}
        position="right bottom"
      >
        <AkGlobalItem href="#">
          <i className="fa fa-cog" aria-hidden="true" />
        </AkGlobalItem>
      </Dropdown>
    )
    return (
      <Navigation
        onResize={this.onResize}
        isOpen={this.state.isOpen}
        globalPrimaryIcon={<i className="fa fa-bar-chart" aria-hidden="true" />}
        globalPrimaryItemHref="/"
        globalSecondaryActions={[settings]}
        globalPrimaryIconAppearance="round"
        containerHeaderComponent={() => (
          <AkContainerTitle text="Quartz" />
        )}
      >
        <AkNavigationItemGroup>
          <Link to={{ pathname: '/' }} style={{ display: 'inline', textDecoration: 'none' }}>
            <AkNavigationItem text="Dashboard" />
          </Link>
          <Link to={{ pathname: '/matches' }} style={{ display: 'inline', textDecoration: 'none' }}>
            <AkNavigationItem text="Matches" />
          </Link>
        </AkNavigationItemGroup>
      </Navigation>
    )
  }
}

export default SideNav
