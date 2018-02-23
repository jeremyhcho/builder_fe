import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// CSS
import './Footer.scss'

class Footer extends React.Component {
  render () {
    return (
      <div styleName="footer">
        <Row center='xs'>
          <Col xs={4} styleName="copyright">
            <p>Copyright</p>
          </Col>

          <Col xs={4} styleName="social-media">
            <p>Social Media link</p>
          </Col>

          <Col xs={4} styleName="contact">
            <p>Contact address</p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Footer
