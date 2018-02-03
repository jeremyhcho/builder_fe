import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Link } from 'react-router-dom'

// Components
import {
  ScheduledModelSelector,
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
    const { fetchingPredictions, prediction, predictions, fetchingPrediction } = this.props

    if (fetchingPredictions || fetchingPrediction || !predictions) {
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
                {
                  this.props.summary.status === 'INPROGRESS' ? (
                    'None of your models created predictions for this game'
                  ) : (
                    'You have not created any models'
                  )
                }
              </h1>
            </div>

            {
              this.props.summary.status === 'SCHEDULED' &&
              <p className="semibold label" style={{ marginTop: '5px' }}>
                Click <Link to='/models' className="link">here</Link> to create your first model.
              </p>
            }
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
            <ScheduledModelSelector />
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
  fetchingPredictions: false,
  fetchingPrediction: false
}

ModelView.propTypes = {
  summary: PropTypes.object,
  predictions: PropTypes.array,
  prediction: PropTypes.object,
  fetchNBAPredictions: PropTypes.func.isRequired,
  fetchingPredictions: PropTypes.bool,
  fetchingPrediction: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  predictions: routines.nba.predictions,
  prediction: routines.nba.prediction,
  fetchingPredictions: routines.callingApi.FETCH_NBA_PREDICTIONS,
  fetchingPrediction: routines.callingApi.FETCH_NBA_PREDICTION,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBAPredictions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelView)
