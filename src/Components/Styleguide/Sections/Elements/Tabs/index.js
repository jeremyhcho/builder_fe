import React from 'react'

// Components
import { Tab } from 'Components/Common'

// CSS
import './Tabs.scss'

const tabItems = [
  { label: 'Market', key: 'market' },
  { label: 'Manager', key: 'manager' },
  { label: 'Route', key: 'route' },
  { label: 'On-Demand', key: 'on-demand' },
  { label: 'Hamper', key: 'hamper', disabled: true },
  { label: 'Rates', key: 'rates' }
]

class Tabs extends React.Component {
  render () {
    return (
      <div className='flex' styleName='tabs'>
        <div className='flex'>
          <Tab
            tabs={tabItems}
            onChange={(menuItem) => this.setState({ selected: menuItem.key })}
            defaultKey='manager'
          />
        </div>
      </div>
    )
  }
}

export default Tabs
