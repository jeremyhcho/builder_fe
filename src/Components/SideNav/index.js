import React from 'react'
import Navigation, { AkNavigationItemGroup, AkNavigationItem, AkContainerTitle, AkGlobalItem } from '@atlaskit/navigation'

// Components
import { Dropdown } from 'Components/Common'

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
      <div>
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
          <AkNavigationItemGroup title="Group 1">
            <AkNavigationItem
              text="Item 1"
              href="#"
            />
            <AkNavigationItem
              text="Item 2"
              href="#"
            />
            <AkNavigationItem
              text="Item 3"
              href="#"
            />
            <AkNavigationItem
              text="Item 4"
              href="#"
            />
          </AkNavigationItemGroup>
        </Navigation>
      </div>
    )
  }
}

export default SideNav
