import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'

// Components
import planFactory from '../Blocks/planFactory'

// CSS
import './SubscriptionSettings.scss'

const PlanDetails = ({ subscription }) => (
  <div>
    {
      planFactory[subscription.plan.id].features.map(feature => (
        <Row styleName="row" key={feature}>
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
