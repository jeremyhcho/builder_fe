import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Components
import { QuartzLink } from 'Components/Common'
import Faq from './Faq'
import Tos from './Tos'
import SideNav from './SideNav'

// Icons
import QuartzIcon from 'Assets/Icons/blue-q-1.svg'

// CSS
import './Help.scss'

class Help extends React.Component {
  render () {
    return (
      <main styleName="help-section">
        <header styleName="header">
          <div styleName="left">
            <QuartzIcon
              width={30}
              height={30}
              style={{ marginRight: '20px' }}
            />

            <QuartzLink to={{ pathname: '/' }}>
              <span>Quartz</span>
            </QuartzLink>
          </div>

          <div styleName="right">
            <QuartzLink to={{ pathname: '/dashboard' }}>
              <span>
                Back to Home
              </span>
            </QuartzLink>
          </div>
        </header>

        <section styleName="help-center">
          <div styleName="title">
            <h4 className='semibold label'>Help Center</h4>
          </div>

          <div styleName="body">
            <SideNav />

            <Switch>
              <Route exact path='/help/faq' component={Faq} />
              <Route exact path='/help/tos' component={Tos} />
              <Redirect to='/help/tos' />
            </Switch>
          </div>
        </section>
      </main>
    )
  }
}

export default Help
