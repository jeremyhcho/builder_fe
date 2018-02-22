import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Icons
import QuartzIcon from 'Assets/Icons/blue-q-1.svg'

// CSS
import './Header.scss'

const Header = () => (
  <div styleName="header">
    <Row between='xs' styleName="col-1000">
      <Col md={6} xs={12} styleName="left">
        <Row middle='xs' styleName="intro">
          <QuartzIcon
            width={58}
            height={58}
            style={{
              marginRight: '20px'
            }}
          />

          <h1 styleName="title">Quartz</h1>

          <p styleName="description">
            A grape! Because who can get a watermelon in their mouth.
          </p>
        </Row>

        <Row styleName="cta">
          <button styleName="action blue">
            Start free trial
          </button>

          <button styleName="action flat">
            Log in
          </button>
        </Row>
      </Col>

      <Col md={6} xs={12} styleName="right">
        <Row center='xs'>
          <h1>Cheese! It's milk that you chew...</h1>
        </Row>
      </Col>
    </Row>
  </div>
)

export default Header
