import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import PredictionItem from './PredictionItem'

// Actions
import { fetchRecentPredictions } from 'Actions'

// CSS
import './RecentPredictions.scss'

class RecentPredictions extends React.Component {
  componentDidMount () {
    this.props.fetchRecentPredictions()
  }

  render () {
    return (
      <div styleName='recent-predictions'>
        {
          this.props.predictions.map((prediction, index) => (
            <PredictionItem
              prediction={prediction}
              key={prediction.id}
              index={index}
            />
          ))
        }
      </div>
    )
  }
}

RecentPredictions.defaultProps = {
  predictions: []
}

RecentPredictions.propTypes = {
  fetchRecentPredictions: PropTypes.func.isRequired,
  predictions: PropTypes.array
}

const mapStateToProps = ({ routines }) => ({
  predictions: routines.dashboard.fetchRecentPredictions
})

const mapDispatchToProps = {
  fetchRecentPredictions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentPredictions)
