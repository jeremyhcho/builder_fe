import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Spinner, Card } from 'Components/Common'

const wrapperStyle = {
  padding: '50px 25px'
}

const OverviewSpinner = ({ label }) => (
  <Card label={label} wrapperStyle={wrapperStyle}>
    <Row center='xs' middle='xs'>
      <Col xs={12}>
        <Spinner lg show />
      </Col>
    </Row>
  </Card>
)

OverviewSpinner.propTypes = {
  label: PropTypes.string.isRequired
}

export default OverviewSpinner
