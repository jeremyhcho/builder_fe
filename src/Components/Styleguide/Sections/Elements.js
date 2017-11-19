import React from 'react'

// Grid
import { Row, Col } from 'react-grid-system'

// Components
import SectionHeader from '../SectionHeader'
import SubHeader from '../SubHeader'
import Button from 'Components/Common/Button'

const Elements = () => (
  <Row>
    <SectionHeader headerText='Elements' />
    <SubHeader subHeaderText='Buttons' />

    <Col xs={8} offset={{ xs: 2 }}>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
      <Button flat><span style={{ textTransform: 'uppercase' }}>Flat Button</span></Button>
    </Col>
  </Row>
)

export default Elements
