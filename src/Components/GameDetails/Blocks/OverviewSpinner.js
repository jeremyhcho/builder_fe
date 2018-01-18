import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Spinner, Card } from 'Components/Common'

const OverviewSpinner = ({ label, style }) => (
  <Card label={label} wrapperStyle={{ padding: '50px 25px', ...style }}>
    <Row center='xs' middle='xs' style={{ height: '100%' }}>
      <Col xs={12}>
        <Spinner lg show />
      </Col>
    </Row>
  </Card>
)

OverviewSpinner.defaultProps = {
  style: {}
}

OverviewSpinner.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default OverviewSpinner
