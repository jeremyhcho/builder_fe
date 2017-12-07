import React from 'react'

// Components
import { Dropdown } from 'Components/Common/Dropdown'

// CSS
import './Dropdowns.scss'

class Dropdowns extends React.Component {
  render () {
    return (
      <div className='flex' styleName='dropdowns'>
        <div className='flex'>
          <p>Default</p>
          <Dropdown>
            Option 1
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Dropdowns
