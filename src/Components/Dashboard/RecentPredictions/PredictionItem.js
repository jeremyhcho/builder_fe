import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

// CSS
import './RecentPredictions.scss'

// Icons
import RightArrow from 'Assets/Icons/right-arrow.svg'

// Components
import { Card } from 'Components/Common'

const PredictionItem = ({ prediction, index, history }) => {
  const resultClass = classNames('result', prediction.result)
  const convertedSpread = () => {
    if (prediction.pick.predicted_spread > 0) {
      return `+${prediction.pick.predicted_spread}`
    }

    return `${prediction.pick.predicted_spread}`
  }

  const navigateToGame = () => history.push({ pathname: `/games/${prediction.match_id}/overview` })

  const marginTop = index === 0 ? '0' : '20px'

  return (
    <Card style={{ marginTop, height: 'auto' }} onClick={navigateToGame}>
      <div styleName='prediction'>
        <span style={{ flex: 1 }}>
          <span className='small' styleName={resultClass}>
            {prediction.result.toUpperCase()}
          </span>
        </span>

        <span className='semibold'>
          {prediction.name}
        </span>

        <span className='semibold'>
          {prediction.away_team_name} @ {prediction.home_team_name}
        </span>

        <span className='semibold'>
          {prediction[`${prediction.pick.match_type}_team_name`]} {convertedSpread()}
        </span>

        <RightArrow />
      </div>
    </Card>
  )
}

PredictionItem.propTypes = {
  prediction: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(PredictionItem)
