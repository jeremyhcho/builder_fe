import React from 'react'

// Components
import SubscriptionPlan from './SubscriptionPlan'

// CSS
import './Subscriptions.scss'

// Helpers
import { planFactory } from 'Helpers'

const colors = [
  'green',
  'blue',
  'red'
]

class Subscriptions extends React.Component {
  state = {
    active: 'basic-plan'
  }

  switchActivePlan (plan) {
    return () => {
      this.setState({ active: plan })
    }
  }

  render () {
    return (
      <div styleName="subscriptions">
        <div center='xs' styleName="col-1000">
          {
            Object.keys(planFactory).map((plan, i) => (
              <div key={plan} onClick={this.switchActivePlan(plan)}>
                <SubscriptionPlan
                  plan={plan}
                  color={colors[i]}
                  active={this.state.active}
                />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Subscriptions
