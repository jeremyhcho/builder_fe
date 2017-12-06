import React from 'react'

// Component
import Button from 'Components/Common/Button'

// CSS
import './Buttons.scss'

const buttonThemes = [
  {
    primary: true,
    text: 'Primary'
  },
  {
    secondary: true,
    text: 'Secondary'
  },
  {
    flat: true,
    text: 'Flat'
  },
  {
    disabled: true,
    text: 'Disabled'
  }
]

const Buttons = () => (
  <div styleName="buttons">
    {
      buttonThemes.map(theme => (
        <div styleName="button-container" key={theme.text}>
          <p styleName="label">{theme.text}</p>
          <Button {...theme} onClick={() => console.log(`clicked ${Object.keys(theme)[0]} button`)}>Button Default</Button>
        </div>
      ))
    }
  </div>
)

export default Buttons
