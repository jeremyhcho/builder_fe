import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

// CSS
import './RecentPredictions.scss'

// Icons
import RightArrow from 'Assets/Icons/right-arrow.svg'

const PredictionItem = ({ prediction, index, history }) => {
  const resultClass = classNames('result', prediction.result)
  const convertedSpread = () => {
    if (prediction.pick.vegas_spread > 0) {
      return `+${prediction.pick.vegas_spread}`
    }

    return `${prediction.pick.vegas_spread}`
  }

  const navigateToGame = () => history.push({ pathname: `/games/${prediction.match_id}/overview` })

  const marginTop = index === 0 ? '0' : '20px'

  return (
    <div styleName='prediction' style={{ marginTop, height: 'auto' }} onClick={navigateToGame}>
      <div styleName='headers'>
        <div className='semibold label'>
          <span className='small' styleName={resultClass} style={{ textAlign: 'center' }}>
            {prediction.result ? prediction.result.toUpperCase() : 'N/A'}
          </span>
        </div>

        <div className='semibold label'>
          Game
        </div>

        <div className='semibold label'>
          Score
        </div>

        <div className='semibold label'>
          Pick
        </div>

      </div>

      <div styleName='cells' style={{ marginTop: '5px' }}>
        <div
          className='semibold'
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'block'
          }}
        >
          {prediction.name}
        </div>

        <div className='semibold'>
          {prediction.away_team_name} @ {prediction.home_team_name}
        </div>

        <div className='semibold'>
          {prediction.away_team_points} - {prediction.home_team_points}
        </div>

        <div className='semibold'>
          {prediction[`${prediction.pick.match_type}_team_name`]} {convertedSpread()}
        </div>
      </div>

      <RightArrow />
    </div>
  )
}

PredictionItem.propTypes = {
  prediction: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(PredictionItem)
