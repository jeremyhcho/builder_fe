import React from 'react'
// import PropTypes from 'prop-types'

// Components
import { Dropdown, NavItem } from 'Components/Common'
import Navigation, {
  AkNavigationItemGroup,
  AkContainerTitle,
  AkGlobalItem,
  // AkContainerNavigationNested
} from '@atlaskit/navigation'

class SideNav extends React.Component {
  state = {
    isOpen: true,
    searchDrawerOpen: false,
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
          <NavItem
            text="Dashboard"
            path="/"
          />
          <NavItem
            text="Matches"
            path="/matches"
          />
        </AkNavigationItemGroup>
      </Navigation>
    )
  }
}

export default SideNav
