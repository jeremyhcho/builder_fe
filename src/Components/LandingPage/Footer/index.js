import React from 'react'

// Assets
import Twitter from 'Assets/Icons/landingPage/twitter.svg'
import Facebook from 'Assets/Icons/landingPage/facebook.svg'

// CSS
import './Footer.scss'

const Footer = () => (
  <div styleName="footer">
    <div styleName="col-1000">
      <div styleName="copyright">
        <p>Quartz Insights LLC</p>
      </div>

      <div styleName="social-media">
        <a href='https://twitter.com/QuzeApp'>
          <Twitter height={24} width={24} />
        </a>

        <a>
          <Facebook />
        </a>
      </div>

      <div styleName="contact">
        <p>Wanna chat?
          <a
            style={{
              fontWeight: '600',
              color: 'var(--blue)',
              textDecoration: 'underline',
              marginLeft: '3px'
            }}
            href='mailto:support@quze.io'
          >
            Contact us
          </a>.
        </p>
      </div>
    </div>
  </div>
)

export default Footer
