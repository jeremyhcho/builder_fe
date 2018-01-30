import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { groupBy } from 'lodash'

// Components
import { Toggle } from 'Components/Common'

// Icons
import ChangeIcon from 'Assets/Icons/switch-arrows.svg'

// Actions
import { fetchNBAPredictions, updateNBAMatchesModels } from 'Actions'

// CSS
import './ModelView.scss'

// Helpers
import { precisionRound } from 'Helpers'

const tenths = precisionRound(1)

class ModelSelector extends React.Component {
  state = {
    modelsOpen: false
  }

  componentWillReceiveProps (newProps) {
    if (newProps.selectedModel.id !== this.props.selectedModel.id && this.props.selectedModel.id) {
      this.openModels()
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  getModelRecords () {
    const { selectedModel } = this.props

    const predictions = selectedModel.model.predictions.filter(prediction => prediction.result)
    const predictionResults = groupBy(predictions, prediction => {
      if (!prediction.result) return 'TBD'
      return prediction.result
    })

    const wins = predictionResults.win.length
    const losses = predictionResults.loss.length
    const ties = predictionResults.tie.length
    const winRate = tenths((wins / (wins + losses + ties)) * 100)

    let streak = 0
    const lastGameResult = predictions[predictions.length - 1].result
    for (let i = predictions.length - 1; i >= 0; i--) {
      if (predictions[i].result === lastGameResult) streak++
      else break;
    }

    const last5Games = groupBy(predictions.slice(-5), prediction => prediction.result)
    const last5Wins = last5Games.win ? `W${last5Games.win.length}` : null
    const last5Losses = last5Games.loss ? `L${last5Games.loss.length}` : null
    const last5Ties = last5Games.tie ? `T${last5Games.tie.length}` : null

    const last5 = [last5Wins, last5Losses, last5Ties].filter(result => result)

    return {
      wins,
      losses,
      ties,
      winRate,
      streak: `${lastGameResult[0].toUpperCase()}${streak}`,
      last5
    }
  }

  changeModel = (e, matchModel) => {
    const { selectedModel } = this.props

    if (this.toggleCol.contains(e.target) || matchModel.id === selectedModel.id) {
      return null
    }

    return this.props.fetchNBAPredictions(matchModel.id)
  }

  openModels = () => {
    this.setState({ modelsOpen: !this.state.modelsOpen }, () => {
      if (this.state.modelsOpen) {
        document.addEventListener('click', this.handleOutsideClick, false)
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false)
      }
    })
  }

  handleOutsideClick = (e) => {
    if (this.modelsList && this.modelsList.contains(e.target)) {
      return null
    }

    return this.openModels()
  }

  changeModelStatus = (matchModel) => {
    let newStatus
    if (matchModel.status === 'ACTIVE') {
      newStatus = 'INACTIVE'
    } else {
      newStatus = 'ACTIVE'
    }

    this.props.updateNBAMatchesModels(matchModel.id, {
      status: newStatus
    })
  }

  checkModelStatus (status) {
    if (status === 'ACTIVE') return true
    return false
  }

  renderModelList () {
    return (
      <div styleName="model-list" ref={ref => this.modelsList = ref}>
        {
          this.props.matchesModels.map(matchModel => (
            <Row
              key={matchModel.id}
              middle='xs'
              styleName="model-attr"
              onClick={(e) => this.changeModel(e, matchModel)}
            >
              <Col xs={6}>
                <p className="label">Name</p>
                <p className="semibold">{matchModel.model.name}</p>
              </Col>

              <Col xs={4}>
                <p className="label">Type</p>
                <p className="semibold">{matchModel.model.type[0].toUpperCase() + matchModel.model.type.substr(1)}</p>
              </Col>

              <Col xs={2}>
                <div ref={ref => this.toggleCol = ref}>
                  <Toggle
                    name={matchModel.id}
                    checked={this.checkModelStatus(matchModel.status)}
                    onChange={() => this.changeModelStatus(matchModel)}
                  />
                </div>
              </Col>
            </Row>
          ))
        }
      </div>
    )
  }

  render () {
    const { selectedModel } = this.props

    const modelRecords = this.getModelRecords()

    return (
      <div styleName="model-selector">
        <div styleName="model-name">
          <h4 className="semibold">{selectedModel.model.name}</h4>
          <ChangeIcon style={{ margin: '0 10px', cursor: 'pointer' }} onClick={this.openModels} />

          {this.state.modelsOpen && this.renderModelList()}
        </div>

        <Row middle='xs' between='xs' styleName="model-stats">
          <div styleName="stats-card">
            <h4 className="semibold">{selectedModel.model.type[0].toUpperCase() + selectedModel.model.type.substr(1)}</h4>
            <p className="label">Type</p>
          </div>

          <div styleName="stats-card">
            <h4 className="semibold">
              {modelRecords.wins}W - {modelRecords.losses}L
            </h4>
            <p className="label">Record</p>
          </div>

          <div styleName="stats-card">
            <h4 className="semibold">
              {modelRecords.winRate}%
            </h4>
            <p className="label">Win %</p>
          </div>

          <div styleName="stats-card">
            <h4 className="semibold">
              {modelRecords.streak}
            </h4>
            <p className="label">Streak</p>
          </div>

          <div styleName="stats-card">
            <h4 className="semibold">
              {modelRecords.last5.join(' - ')}
            </h4>
            <p className="label">Last 5</p>
          </div>
        </Row>
      </div>
    )
  }
}

ModelSelector.defaultProps = {
  matchesModels: [],
  selectedModel: {}
}

ModelSelector.propTypes = {
  matchesModels: PropTypes.array,
  selectedModel: PropTypes.object,
  updateNBAMatchesModels: PropTypes.func.isRequired,
  fetchNBAPredictions: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  matchesModels: routines.nba.matchesModels,
  selectedModel: routines.nba.predictions
})

const mapDispatchToProps = {
  fetchNBAPredictions,
  updateNBAMatchesModels
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelSelector)
