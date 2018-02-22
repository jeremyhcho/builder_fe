import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Icons
import QuartzIcon from 'Assets/Icons/blue-q-1.svg'

// CSS
import './LandingPage.scss'

const Header = () => (
  <div styleName="header">
    <Row center='xs' between='xs' styleName="col-1000">
      <Col lg={6} xs={12} styleName="left">
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

      <Col lg={6} xs={12} styleName="right">
        <div>
          <h1>Cheese! It's milk that you chew...</h1>
        </div>
      </Col>
    </Row>
  </div>
)

export default Header
