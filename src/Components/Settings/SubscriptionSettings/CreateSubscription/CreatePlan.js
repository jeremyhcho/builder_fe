import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import SubscriptionPlan from '../../Blocks/SubscriptionPlan'

const CreatePlan = ({ selectPlan }) => (
  <Row center='xs'>
    <Col>
      <SubscriptionPlan
        plan="basic-plan"
        select={selectPlan}
      />
    </Col>

    <Col>
      <SubscriptionPlan
        plan="advanced-plan"
        select={selectPlan}
      />
    </Col>
  </Row>
)


CreatePlan.propTypes = {
  selectPlan: PropTypes.func.isRequired
}

export default CreatePlan
