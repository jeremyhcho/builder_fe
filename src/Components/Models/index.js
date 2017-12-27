import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Spinner } from 'Components/Common'

class Models extends React.Component {
  render () {
    return (
      <Row center='xs' className="loader">
        <Col xs={12}>
          <Spinner lg show />
        </Col>
      </Row>
    )
  }
}

export default Models
