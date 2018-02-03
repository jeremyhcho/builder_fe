import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import {
  CompletedModelSelector,
  ModelDetails,
  Predictions,
  TotalPrediction,
  SpreadPrediction
} from 'Components/GameDetails/Blocks'

// Icons
import NoModelsIcon from 'Assets/Icons/missing-content.svg'

// Actions
import { fetchNBAPredictions } from 'Actions'

class ModelView extends React.Component {
  componentDidMount () {
    this.props.fetchNBAPredictions(this.props.summary.id)
  }

  render () {
    const { fetchPredictions, prediction, predictions, fetchingPrediction } = this.props

    if (fetchPredictions || fetchingPrediction || !predictions) {
      // View when fetching models .. loader
      return <div />
    }

    if (!predictions.length) {
      // View when user has no models .. link to models route
      return (
        <div style={{ position: 'relative', height: '100%' }}>
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              textAlign: 'center',
              transform: 'translateX(-50%)'
            }}
          >
            <div style={{ opacity: '0.2' }}>
              <NoModelsIcon height={256} width={256} />

              <h1 className="bold" style={{ marginTop: '15px' }}>
                Your account doesn't have any predictions made for this game
              </h1>
            </div>
          </div>
        </div>
      )
    }

    if (predictions.length && !prediction) {
      return <div />
    }

    return (
      <div style={{ maxWidth: '1300px', width: '100%' }}>
        <Row>
          <Col xs={12}>
            <CompletedModelSelector />
          </Col>

          <div>
            <ModelDetails />
          </div>
        </Row>

        <Row style={{ marginBottom: '-50px' }}>
          <Col xs={7}>
            <Predictions />
          </Col>

          <Col xs={5}>
            <TotalPrediction />
          </Col>
        </Row>

        <Row>
          <Col xs={7}>
            <SpreadPrediction />
          </Col>
        </Row>
      </div>
    )
  }
}

ModelView.defaultProps = {
  predictions: null,
  prediction: null,
  summary: {},
  fetchPredictions: false,
  fetchingPrediction: false
}

ModelView.propTypes = {
  summary: PropTypes.object,
  predictions: PropTypes.array,
  prediction: PropTypes.object,
  fetchNBAPredictions: PropTypes.func.isRequired,
  fetchPredictions: PropTypes.bool,
  fetchingPrediction: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  predictions: routines.nba.predictions,
  prediction: routines.nba.prediction,
  fetchPredictions: routines.callingApi.FETCH_NBA_PREDICTIONS,
  fetchingPrediction: routines.callingApi.FETCH_NBA_PREDICTIONS,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBAPredictions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelView)
