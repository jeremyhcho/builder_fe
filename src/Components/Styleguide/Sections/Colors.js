import React from 'react'

// Grid
import { Row } from 'react-grid-system'

// Components
import SectionHeader from '../SectionHeader'
import SubHeader from '../SubHeader'

const Colors = () => (
  <Row>
    <SectionHeader headerText='Colors' />
    <SubHeader subHeaderText='Main Colors' />
  </Row>
)

export default Colors
