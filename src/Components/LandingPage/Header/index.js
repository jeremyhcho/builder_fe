import React from 'react'

// Icons
import QuartzIcon from 'Assets/Icons/blue-q-1.svg'

// CSS
import './Header.scss'

const Header = () => (
  <header styleName="header">
    <main styleName="col-1000">
      <section styleName="left">
        <div styleName="intro">
          <QuartzIcon
            width={58}
            height={58}
            style={{ marginRight: '20px' }}
          />

          <h1 styleName="title">Quartz</h1>

          <p styleName="description">
            A grape! Because who can get a watermelon in their mouth.
          </p>
        </div>

        <div styleName="cta">
          <button styleName="action blue">
            Start free trial
          </button>

          <button styleName="action flat">
            Log in
          </button>
        </div>
      </section>

      <section styleName="right">
        <div>
          <img
            src="https://s3-us-west-1.amazonaws.com/builder-api/data_exports/assets/macbook_pro.jpg"
            style={{
              height: '100%',
              width: '100%'
            }}
          />
        </div>
      </section>
    </main>
  </header>
)

export default Header
