import React from 'react'

// Components
import { QuzeLink } from 'Components/Common'

// Icons
import RightIcon from 'Assets/Icons/right-arrow.svg'

// CSS
import './SideNav.scss'

class SideNav extends React.Component {
  render () {
    return (
      <div styleName="sidenav">
        <ul>
          <li>
            <QuzeLink to='/help/faq'>
              <div styleName="help-item">
                <div styleName="left">
                  <p className="semibold">FAQ</p>
                </div>

                <div styleName="right">
                  <RightIcon height={16} width={16} />
                </div>
              </div>
            </QuzeLink>
          </li>

          <li>
            <QuzeLink to='/help/tos'>
              <div styleName="help-item">
                <div styleName="left">
                  <p className="semibold">Terms of service</p>
                </div>

                <div styleName="right">
                  <RightIcon height={16} width={16} />
                </div>
              </div>
            </QuzeLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideNav
