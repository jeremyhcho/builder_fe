import React from 'react'

// Component
import Tab from 'Components/Common/Tab'

const tabItems = [
  { label: 'Market', key: 'market' },
  { label: 'Manager', key: 'manager' },
  { label: 'Route', key: 'route' },
  { label: 'On-Demand', key: 'on-demand' },
  { label: 'Hamper', key: 'hamper', disabled: true },
  { label: 'Rates', key: 'rates' }
]

class Tabs extends React.Component {
  state = {
    selected: 'manager'
  }

  render () {
    return (
      <Tab
        tabs={tabItems}
        onChange={(menuItem) => this.setState({ selected: menuItem.key })}
        defaultKey='manager'
      />
    )
  }
}

export default Tabs
