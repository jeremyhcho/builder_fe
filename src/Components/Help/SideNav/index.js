import React from 'react'

// Components
import { QuartzLink } from 'Components/Common'

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
            <QuartzLink to='/help/faq'>
              <div styleName="help-item">
                <p className="semibold">FAQ</p>
                <RightIcon height={16} width={16} />
              </div>
            </QuartzLink>
          </li>

          <li>
            <QuartzLink to='/help/tos'>
              <div styleName="help-item">
                <p className="semibold">Terms of use</p>
                <RightIcon height={16} width={16} />
              </div>
            </QuartzLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideNav
