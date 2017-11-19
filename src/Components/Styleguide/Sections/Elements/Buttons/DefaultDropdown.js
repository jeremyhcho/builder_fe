import React from 'react'

// Components
import { Dropdown } from 'Components/Common/Button'

// CSS
import './../Elements.scss'

const DefaultDropdown = () => (
  <div styleName="button-container">
    <p className='bold' styleName="label">Dropdown</p>
    <Dropdown>
      <a href="#">Example 1</a>
      <a href="#">Example 2</a>
      <a href="#">Example 3</a>
    </Dropdown>
  </div>
)

export default DefaultDropdown
