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
            style={{ marginRight: '20px' }}
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
          <img
            src="https://s3-us-west-1.amazonaws.com/builder-api/data_exports/assets/macbook_pro.jpg"
            style={{
              height: '100%',
              width: '100%'
            }}
          />
        </Row>
      </Col>
    </Row>
  </div>
)

export default Header
