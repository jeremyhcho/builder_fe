import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import SubscriptionPlan from './SubscriptionPlan'

// CSS
import '../LandingPage.scss'

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
        <Row center='xs' styleName="col-1000">
          {
            Object.keys(planFactory).map((plan, i) => (
              <Col key={plan} onClick={this.switchActivePlan(plan)}>
                <SubscriptionPlan
                  plan={plan}
                  color={colors[i]}
                  active={this.state.active}
                />
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }
}

export default Subscriptions
