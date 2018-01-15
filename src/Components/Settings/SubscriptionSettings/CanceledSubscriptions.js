import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'
import moment from 'moment'

// CSS
import './SubscriptionSettings.scss'

const CanceledSubscriptions = ({ canceledSubscriptions }) => {
  const convertUnix = (date) => {
    return moment.unix(date).format('MMM DD, YYYY')
  }

  return (
    <div>
      {
        canceledSubscriptions.map(subscription => {
          return (
            <div key={subscription.id}>
              <Row middle='xs' styleName="row">
                <div styleName="col">
                  Canceled subscription:
                </div>
                <div>
                  {subscription.plan.name} on {convertUnix(subscription.canceled_at)}
                </div>
              </Row>

              <Row middle='xs' style={{ margin: '0 0 10px' }}>
                <div styleName="col">
                  <p>Subscription created: </p>
                </div>
                <div>
                  {convertUnix(subscription.created)}
                </div>
              </Row>
              <p styleName="row" className="label small">This subscription will end at {convertUnix(subscription.current_period_end)} and will not be billed</p>
            </div>
          )
        })
      }
    </div>
  )
}

CanceledSubscriptions.defaultProps = {
  canceledSubscriptions: []
}

CanceledSubscriptions.propTypes = {
  canceledSubscriptions: PropTypes.array
}

export default CanceledSubscriptions
