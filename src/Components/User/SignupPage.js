import React, { Component } from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'

// Components
import { PageHeader } from 'Components/Common'
import SignupForm from './SignupForm'

class SignupPage extends Component {
  render () {
    return (
      <Row>
        <Col xs={6} xsOffset={3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PageHeader>$$$ MONEY MONEY MONEY $$$</PageHeader>
          </div>
        </Col>
        <Col xs={6} xsOffset={3}>
          <SignupForm />
        </Col>
      </Row>
    )
  }
}

export default SignupPage
