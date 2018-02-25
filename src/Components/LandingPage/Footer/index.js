import React from 'react'

// CSS
import './Footer.scss'

class Footer extends React.Component {
  render () {
    return (
      <div styleName="footer">
        <div styleName="col-1000">
          <div styleName="copyright">
            <p>Copyright</p>
          </div>

          <div styleName="social-media">
            <p>Social Media link</p>
          </div>

          <div styleName="contact">
            <p>Contact address</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
