import React, { Component } from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
import { Link } from 'react-router-dom'

// Components
import SignupForm from './SignupForm'

// CSS
import './Signup.scss'

class Signup extends Component {
  render () {
    return (
      <Row>
        <Col xs={6} xsOffset={3}>
          <div styleName="header">
            <h2>Sign up for your account</h2>
          </div>
        </Col>
        <Col xs={6} xsOffset={3}>
          <SignupForm />
        </Col>
        <Col xs={6} xsOffset={3}>
          <p
            styleName="link"
          >
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Col>
      </Row>
    )
  }
}

export default Signup
