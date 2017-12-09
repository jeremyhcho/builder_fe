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
import Tooltips from './Tooltips'
import Dropdowns from './Dropdowns'
import Spinners from './Spinners'

// CSS
import './Elements.scss'

const Elements = () => (
  <div styleName="elements">
    <SectionHeader headerText='Elements' />
    <SubHeader subHeaderText='Buttons' />
    <Buttons />

    <SubHeader subHeaderText='Spinners' />
    <Spinners />

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

    <SubHeader subHeaderText='Tooltips' />
    <Tooltips />

    <SubHeader subHeaderText='Dropdowns' />
    <Dropdowns />
  </div>
)

export default Elements
