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
import Sliders from './Sliders'
import TextAreas from './TextAreas'

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

    <SubHeader subHeaderText='Text Areas' />
    <TextAreas />

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

    <SubHeader subHeaderText="Sliders" />

    <SubHeader subHeaderText='Radios' />
    <Radios />

    <SubHeader subHeaderText='Sliders' />
    <Sliders />
  </div>
)

export default Elements
