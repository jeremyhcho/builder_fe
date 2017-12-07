import React from 'react'

// Components
import SectionHeader from '../../SectionHeader'
import SubHeader from '../../SubHeader'
import Buttons from './Buttons'
import Toggles from './Toggles'
import Inputs from './Inputs'
import Radios from './Radios'
import Checkboxes from './Checkboxes'
import Tabs from './Tabs'

// CSS
import './Elements.scss'

const Elements = () => (
  <div styleName="elements">
    <SectionHeader headerText='Elements' />
    <SubHeader subHeaderText='Buttons' />
    <Buttons />

    <SubHeader subHeaderText='Toggles' />
    <Toggles />

    <SubHeader subHeaderText='Inputs' />
    <Inputs />

    <SubHeader subHeaderText='Radios' />
    <Radios />

    <SubHeader subHeaderText='Checkboxes' />
    <Checkboxes />

    <SubHeader subHeaderText='Tabs' />
    <Tabs />
  </div>
)

export default Elements