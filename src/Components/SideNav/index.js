import React from 'react'
// import PropTypes from 'prop-types'

// Components
import { Dropdown, NavItem } from 'Components/Atlaskit'
import DashboardIcon from '@atlaskit/icon/glyph/dashboard'
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line'
import DetailViewIcon from '@atlaskit/icon/glyph/detail-view'
import SettingsIcon from '@atlaskit/icon/glyph/settings'
import Navigation, {
  AkNavigationItemGroup,
  AkContainerTitle,
  AkGlobalItem,
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
          <SettingsIcon label="settings" />
        </AkGlobalItem>
      </Dropdown>
    )
    return (
      <Navigation
        onResize={this.onResize}
        isOpen={this.state.isOpen}
        globalPrimaryIcon={<GraphLineIcon label="statistics" />}
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
            icon={<DashboardIcon label="dashboard" />}
            path="/"
          />
          <NavItem
            text="Matches"
            icon={<DetailViewIcon label="matches" />}
            path="/matches"
          />
        </AkNavigationItemGroup>
      </Navigation>
    )
  }
}

export default SideNav
