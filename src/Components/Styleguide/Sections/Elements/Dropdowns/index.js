import React from 'react'

// Components
import Dropdown from 'Components/Common/Dropdown'
import MenuItem from 'Components/Common/Dropdown/MenuItem'

// CSS
import './Dropdowns.scss'

class Dropdowns extends React.Component {
  render () {
    return (
      <div className='flex' styleName='dropdowns'>
        <div className='flex'>
          <p>Default</p>
          <Dropdown defaultText='Choices'>
            <MenuItem onClick={() => console.log('Hello')}>
              Option 1
            </MenuItem>

            <MenuItem onClick={() => console.log('Hello')}>
              Option 2
            </MenuItem>

            <MenuItem onClick={() => console.log('Hello')}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
            </MenuItem>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Dropdowns
