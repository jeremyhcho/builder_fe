import React from 'react'
import PropTypes from 'prop-types'

// Components
import SubscriptionPlan from '../../Blocks/SubscriptionPlan'

// CSS
import './CreateSubscription.scss'

const CreatePlan = ({ selectPlan }) => (
  <div styleName="plans">
    <SubscriptionPlan
      plan="basic-plan"
      select={selectPlan}
    />
    <SubscriptionPlan
      plan="advanced-plan"
      select={selectPlan}
    />
  </div>
)


CreatePlan.propTypes = {
  selectPlan: PropTypes.func.isRequired
}

export default CreatePlan
