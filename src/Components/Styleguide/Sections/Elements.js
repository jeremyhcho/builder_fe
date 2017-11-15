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
      <Button>Primary</Button>
      <Button theme="secondary">Secondary</Button>
    </Col>
  </Row>
)

export default Elements
