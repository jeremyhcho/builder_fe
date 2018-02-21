import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Icons
import QuartzIcon from 'Assets/Icons/blue-q-1.svg'

// CSS
import './LandingPage.scss'

class Header extends React.Component {
  render () {
    return (
      <div styleName="header">
        <Row center='xs' between='xs' styleName="col-1000">
          <Col xs={6} styleName="left">
            <Row middle='xs'>
              <QuartzIcon
                width={58}
                height={58}
                style={{
                  marginRight: '20px'
                }}
              />
              <h1 styleName="title">Quartz</h1>
            </Row>

            <p styleName="description">
              A grape! Because who can get a watermelon in their mouth.
            </p>

            <Row styleName="cta">
              <button styleName="action blue">
                Start free trial
              </button>

              <button styleName="action flat">
                Log in
              </button>
            </Row>
          </Col>

          <Col xs={6} styleName="right">
            <div>
              <img src='./macbook_pro.jpg' />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header
