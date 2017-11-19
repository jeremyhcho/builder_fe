import React from 'react'

// Components
import SectionHeader from '../../SectionHeader'
import SubHeader from '../../SubHeader'
import Buttons from './Buttons'
import Toggles from './Toggles'
import Radios from './Radios'
import Checkboxes from './Checkboxes'

// CSS
import './Elements.scss'

const Elements = () => (
  <div styleName="elements">
    <SectionHeader headerText='Elements' />

    <SubHeader subHeaderText='Buttons' />
    <Buttons />

    <SubHeader subHeaderText='Toggles' />
    <Toggles />

    <SubHeader subHeaderText='Radios' style={{ marginTop: '60px' }} />
    <Radios />

    <SubHeader subHeaderText='Checkboxes' style={{ marginTop: '60px' }} />
    <Checkboxes />
  </div>
)

export default Elements
