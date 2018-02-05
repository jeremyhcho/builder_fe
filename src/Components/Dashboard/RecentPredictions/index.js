import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import PredictionItem from './PredictionItem'
import { Card } from 'Components/Common'

// Actions
import { fetchRecentPredictions } from 'Actions'

// CSS
import './RecentPredictions.scss'

// Icons
import ColoredAppIcon from 'Assets/Icons/colored-app-cancel.svg'

class RecentPredictions extends React.Component {
  componentDidMount () {
    this.props.fetchRecentPredictions()
  }

  renderPredictions () {
    if (!this.props.predictions.length) {
      return (
        <Card style={{ marginTop: 0 }} wrapperStyle={{ height: '500px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <ColoredAppIcon width={100} height={100} />
            <h4 style={{ marginTop: '15px' }}>
              No Active Predictions Found
            </h4>
          </div>
        </Card>
      )
    }

    return this.props.predictions.map((prediction, index) => (
      <PredictionItem
        prediction={prediction}
        key={prediction.id}
        index={index}
      />
    ))
  }

  render () {
    return (
      <div styleName='recent-predictions'>
        {this.renderPredictions()}
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
