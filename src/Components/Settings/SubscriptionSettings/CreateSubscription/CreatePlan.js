import React from 'react'
import PropTypes from 'prop-types'

// Components
import SubscriptionPlan from '../../Blocks/SubscriptionPlan'

const CreatePlan = ({ selectPlan }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
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
