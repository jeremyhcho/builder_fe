import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import classNames from 'classnames'

// Components
import { Toggle, Spinner } from 'Components/Common'

// Icons
import RightIcon from 'Assets/Icons/right-arrow.svg'
import BlueRightIcon from 'Assets/Icons/blue-right-arrow.svg'

// Actions
import { fetchNBAModel, fetchNBAPrediction } from 'Actions'

// CSS
import './ModelSelector.scss'

class CompletedModelSelector extends React.Component {
  state = {
    modelsOpen: false,
    hovered: false,
    changingModel: {}
  }

  componentWillReceiveProps (newProps) {
    if (newProps.model.id !== this.props.model.id && this.props.model.id) {
      this.setState({
        modelsOpen: false
      }, () => {
        document.removeEventListener('click', this.handleOutsideClick, false)
      })
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  getResult (result) {
    if (!result) {
      return 'INACTIVE'
    }

    return result.toUpperCase()
  }

  fetchModelAndPrediction (modelId, predictionId) {
    this.props.fetchNBAModel(modelId)
    this.props.fetchNBAPrediction(predictionId)
  }

  changeModel = (e, matchModel) => {
    const { prediction, fetchingModel } = this.props

    if (fetchingModel) {
      return null
    }

    if (this.toggleCol.contains(e.target) || matchModel.id === prediction.id) {
      return null
    }

    return this.setState({
      changingModel: matchModel
    }, () => this.fetchModelAndPrediction(matchModel.model_id, matchModel.id))
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

  checkModelStatus (status) {
    if (status === 'ACTIVE') return true
    return false
  }

  renderModelList () {
    const modelListStyle = classNames('model-list', {
      show: this.state.modelsOpen
    })

    return (
      <div
        key="model-list"
        styleName={modelListStyle}
        ref={ref => this.modelsList = ref}
      >
        {
          this.props.predictions.map(matchModel => (
            <Row
              key={matchModel.id}
              middle='xs'
              styleName="match-model"
              onClick={(e) => this.changeModel(e, matchModel)}
            >
              <Col xs={5}>
                <p className="label">Name</p>
                <p className="semibold clip">{matchModel.name}</p>
              </Col>

              <Col xs={3}>
                <p className="label">Type</p>
                <p className="semibold">{matchModel.type[0].toUpperCase() + matchModel.type.substr(1)}</p>
              </Col>

              <Col xs={3}>
                <p className="label">Result</p>
                <p className="semibold">{this.getResult(matchModel.result)}</p>
              </Col>

              <Col xs={1}>
                {
                  this.props.fetchingModel
                    && matchModel.id === this.state.changingModel.id ? (
                      <Spinner sm show style={{ marginLeft: '10px' }} />
                    ) : (
                      <div ref={ref => this.toggleCol = ref}>
                        <Toggle
                          name={matchModel.id}
                          disabled
                          checked={this.checkModelStatus(matchModel.status)}
                          onChange={() => null}
                        />
                      </div>
                    )
                }
              </Col>
            </Row>
          ))
        }
      </div>
    )
  }

  render () {
    const { prediction } = this.props

    if (!Object.keys(prediction).length) {
      return <div />
    }

    const arrowIconStyle = classNames('arrow-icon', {
      clicked: this.state.modelsOpen
    })

    return (
      <div
        key="model-name"
        styleName="model-selector"
        onClick={this.openModels}
        onMouseEnter={() => this.setState({ hovered: !this.state.hovered })}
        onMouseLeave={() => this.setState({ hovered: !this.state.hovered })}
      >
        <p styleName="model-name" className="semibold small">{prediction.name}</p>

        <div styleName={arrowIconStyle}>
          {this.state.hovered ? <BlueRightIcon /> : <RightIcon />}
        </div>

        {this.renderModelList()}
      </div>
    )
  }
}

CompletedModelSelector.defaultProps = {
  predictions: [],
  prediction: {},
  model: {},
  fetchingModel: false
}

CompletedModelSelector.propTypes = {
  predictions: PropTypes.array,
  prediction: PropTypes.object,
  model: PropTypes.object,
  fetchNBAModel: PropTypes.func.isRequired,
  fetchNBAPrediction: PropTypes.func.isRequired,
  fetchingModel: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  predictions: routines.nba.predictions,
  prediction: routines.nba.prediction,
  model: routines.nba.model,
  fetchingModel: routines.isLoading.FETCH_NBA_MODEL
})

const mapDispatchToProps = {
  fetchNBAModel,
  fetchNBAPrediction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedModelSelector)
