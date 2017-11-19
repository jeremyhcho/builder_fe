import React from 'react'

// Components
import SectionHeader from '../../SectionHeader'
import SubHeader from '../../SubHeader'
import Buttons from './Buttons'
import Toggles from './Toggles'
import Radios from './Radios'

// CSS
import './Elements.scss'

const Elements = () => (
  <div styleName="elements">
    <SectionHeader headerText='Elements' />

    <SubHeader subHeaderText='Buttons' />
    <Buttons />

    <SubHeader subHeaderText='Toggle' />
    <Toggles />

    <SubHeader subHeaderText='Radios' />
    <Radios />
  </div>
)

export default Elements
