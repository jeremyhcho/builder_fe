import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Link } from 'react-router-dom'

// Components
import {
  ModelSelector,
  Predictions,
  TotalPrediction,
  SpreadPrediction
} from 'Components/GameDetails/Blocks'

// Icons
import NoModelsIcon from 'Assets/Icons/models/no-models.svg'

// Actions
import { fetchNBAMatchesModels } from 'Actions'

class ModelView extends React.Component {
  componentDidMount () {
    this.props.fetchNBAMatchesModels(this.props.summary.id)
  }

  render () {
    const { fetchingMatchesModels, selectedModel, matchesModels, fetchingPredictions } = this.props

    if (fetchingMatchesModels || fetchingPredictions || !matchesModels || !selectedModel) {
      // View when fetching models .. loader
      return <div />
    }

    if (!matchesModels.length) {
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

              <h1 className="bold" style={{ marginTop: '15px' }}>You have not created any models</h1>
            </div>

            <p className="semibold label" style={{ marginTop: '5px' }}>
              Click <Link to='/models' className="link">here</Link> to create your first model.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div style={{ maxWidth: '1300px', width: '100%' }}>
        <Row>
          <ModelSelector />
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
  matchesModels: null,
  selectedModel: null,
  summary: {},
  fetchingMatchesModels: false,
  fetchingPredictions: false
}

ModelView.propTypes = {
  summary: PropTypes.object,
  matchesModels: PropTypes.array,
  selectedModel: PropTypes.object,
  fetchNBAMatchesModels: PropTypes.func.isRequired,
  fetchingMatchesModels: PropTypes.bool,
  fetchingPredictions: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  matchesModels: routines.nba.matchesModels,
  selectedModel: routines.nba.predictions,
  fetchingMatchesModels: routines.callingApi.FETCH_NBA_MATCHES_MODELS,
  fetchingPredictions: routines.callingApi.FETCH_NBA_PREDICTIONS,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBAMatchesModels
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelView)
