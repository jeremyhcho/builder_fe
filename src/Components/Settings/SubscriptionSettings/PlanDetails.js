import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'

// CSS
import './SubscriptionSettings.scss'

// Helpers
import { planFactory } from 'Helpers'

const PlanDetails = ({ subscription }) => (
  <div>
    {
      planFactory[subscription.plan.id].features.map((feature, index) => (
        <Row
          key={feature}
          styleName={
            index === planFactory[subscription.plan.id].features.length - 1
              ? 'end-row' : 'row'
          }
        >
          <p>{feature}</p>
        </Row>
      ))
    }
  </div>
)

PlanDetails.propTypes = {
  subscription: PropTypes.object.isRequired
}

export default PlanDetails
