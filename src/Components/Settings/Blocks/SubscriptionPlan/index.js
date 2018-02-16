import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Button } from 'Components/Common'
import planFactory from '../planFactory'

// Icons
import CheckIcon from 'Assets/Icons/green-check.svg'

// CSS
import './SubscriptionPlan.scss'

// Helpers
import { makeFilterSubscriptions } from 'Helpers/Selectors'

const initialStyle = {
  height: '220px',
  width: '400px',
  padding: '30px',
  position: 'relative',
  transition: 'all 200ms ease'
}

class SubscriptionPlan extends React.Component {
  state = {
    style: initialStyle
  }

  selectPlan = () => {
    this.props.select(this.props.plan)
  }

  handleMouseOver = () => {
    this.setState({
      style: {
        ...this.state.style,
        boxShadow: '0px 4px 4px var(--gray)'
      }
    })
  }

  handleMouseOut = () => {
    this.setState({ style: initialStyle })
  }

  renderButton () {
    const { subscription, plan, updatingSubscription, creatingSubscription } = this.props
    const buttonStyle = {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      width: '85%'
    }

    if (subscription && subscription.plan.id === plan) {
      return (
        <p
          style={{ ...buttonStyle, cursor: 'default' }}
          className="semibold"
        >
          You are currently on this plan
        </p>
      )
    }

    if (plan === 'advanced-plan') {
      return (
        <Button
          style={buttonStyle}
          disabled
          shouldFitContainer
        >
          This plan is currently unavailable
        </Button>
      )
    }

    if (updatingSubscription || creatingSubscription) {
      return (
        <Button style={buttonStyle} shouldFitContainer loading />
      )
    }

    return (
      <Button
        onClick={this.selectPlan}
        style={buttonStyle}
        type="button"
        shouldFitContainer
      >
        Choose this plan
      </Button>
    )
  }

  render () {
    const { plan } = this.props

    // const PlanIcon = planFactory[plan].icon

    return (
      <Card
        style={{ display: 'inline-block', margin: '10px 20px' }}
        wrapperStyle={this.state.style}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div styleName="subscription-plan">
          <Row styleName="plan-details" middle='xs' start='xs'>
            <Col xs={5}>
              {/* <div styleName="icon-row">
                <PlanIcon width={35} height={35} />
              </div> */}

              <div>
                <p className="semibold">{plan.toUpperCase()}</p>

                <div styleName="price">
                  <span className="semibold" styleName="dollar">$</span>
                  <span className="semibold" styleName="amount">{planFactory[plan].price}</span>
                  <span className="small" style={{ letterSpacing: '0.5px' }}>/mo</span>
                </div>
              </div>
            </Col>

            <Col xs={7}>
              <div styleName="features">
                {
                  planFactory[plan].features.map(feature => (
                    <div
                      key={feature}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '5px'
                      }}
                    >
                      <CheckIcon height={10} width={10} style={{ marginRight: '10px' }} />
                      <p style={{ textAlign: 'left' }}>{feature}</p>
                    </div>
                  ))
                }
              </div>
            </Col>
          </Row>

          <Row>
            {this.renderButton()}
          </Row>
        </div>
      </Card>
    )
  }
}

SubscriptionPlan.defaultProps = {
  select: () => null,
  subscription: null,
  creatingSubscription: false,
  updatingSubscription: false
}

SubscriptionPlan.propTypes = {
  plan: PropTypes.oneOf(['basic-plan', 'advanced-plan']).isRequired,
  select: PropTypes.func,
  subscription: PropTypes.object,
  creatingSubscription: PropTypes.bool,
  updatingSubscription: PropTypes.bool
}

const makeMapStateToProps = () => {
  const getSubscription = makeFilterSubscriptions()
  return ({ routines }) => ({
    subscription: getSubscription(routines).subscription,
    creatingSubscription: routines.isLoading.CREATE_SUBSCRIPTION,
    updatingSubscription: routines.isLoading.UPDATE_SUBSCRIPTION
  })
}

export default connect(
  makeMapStateToProps
)(SubscriptionPlan)
