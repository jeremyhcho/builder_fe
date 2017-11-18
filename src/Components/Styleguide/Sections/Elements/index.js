import React from 'react'

// Components
import SectionHeader from './../../SectionHeader'
import SubHeader from './../../SubHeader'
import { DefaultButton, DefaultDropdown } from './Buttons'


// Props
import { defaultButtonThemes } from './Buttons/button-themes'

// CSS
import './Elements.scss'

const Elements = () => (
  <div styleName="elements">
    <SectionHeader headerText='Elements' />
    <SubHeader subHeaderText='Buttons' />
    <div styleName="buttons-list">
      {
        defaultButtonThemes.map((theme) => (
          <DefaultButton theme={theme} key={theme.text} />
        ))
      }
    </div>
    <div styleName="buttons-list">
      <DefaultDropdown />
    </div>
  </div>
)

export default Elements
