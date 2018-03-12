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
        <p>Quze Insights LLC</p>
      </div>

      <div styleName="social-media">
        <a href='https://twitter.com/Quze_App'>
          <Twitter height={24} width={24} />
        </a>

        <a href='https://www.facebook.com/QuzeApplication/'>
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
            href='mailto:support@Quzeapp.com'
          >
            Contact us
          </a>.
        </p>
      </div>
    </div>
  </div>
)

export default Footer
