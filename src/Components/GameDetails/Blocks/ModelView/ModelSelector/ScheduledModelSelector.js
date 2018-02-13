import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import classNames from 'classnames'

// Components
import { Toggle } from 'Components/Common'

// Icons
import RightIcon from 'Assets/Icons/right-arrow.svg'
import BlueRightIcon from 'Assets/Icons/blue-right-arrow.svg'

// Actions
import { fetchNBAPrediction, updateNBAMatchesModels } from 'Actions'

// CSS
import './ModelSelector.scss'

class ScheduledModelSelector extends React.Component {
  state = {
    modelsOpen: false
  }

  componentWillReceiveProps (newProps) {
    if (newProps.selectedPrediction.id !== this.props.selectedPrediction.id &&
        this.props.selectedPrediction.id) {
      this.openModels()
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  changeModel = (e, matchModel) => {
    const { selectedPrediction } = this.props

    if (this.toggleCol.contains(e.target) || matchModel.id === selectedPrediction.id) {
      return null
    }

    return this.props.fetchNBAPrediction(matchModel.id)
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
    const modelListStyle = classNames('model-list', {
      show: this.state.modelsOpen
    })

    return (
      <div styleName={modelListStyle} ref={ref => this.modelsList = ref}>
        {
          this.props.predictions.map(prediction => (
            <Row
              key={prediction.id}
              middle='xs'
              styleName="match-model"
              onClick={(e) => this.changeModel(e, prediction)}
            >
              <Col xs={6}>
                <p className="label">Name</p>
                <p className="semibold clip">{prediction.name}</p>
              </Col>

              <Col xs={4}>
                <p className="label">Type</p>
                <p className="semibold">{prediction.type[0].toUpperCase() + prediction.type.substr(1)}</p>
              </Col>

              <Col xs={2}>
                <div ref={ref => this.toggleCol = ref}>
                  <Toggle
                    name={prediction.id}
                    checked={this.checkModelStatus(prediction.status)}
                    onChange={() => this.changeModelStatus(prediction)}
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
    const { selectedPrediction } = this.props

    return (
      <div styleName="model-selector">
        <div
          styleName="model-name"
          onClick={this.openModels}
          onMouseEnter={() => this.setState({ hovered: !this.state.hovered })}
          onMouseLeave={() => this.setState({ hovered: !this.state.hovered })}
        >
          <h4 className="semibold">{selectedPrediction.name}</h4>
          <div style={{ margin: '5px 10px 0' }}>
            {this.state.hovered ? <BlueRightIcon /> : <RightIcon />}
          </div>
        </div>

        {this.renderModelList()}
      </div>
    )
  }
}

ScheduledModelSelector.defaultProps = {
  predictions: [],
  selectedPrediction: {}
}

ScheduledModelSelector.propTypes = {
  predictions: PropTypes.array,
  selectedPrediction: PropTypes.object,
  updateNBAMatchesModels: PropTypes.func.isRequired,
  fetchNBAPrediction: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  predictions: routines.nba.predictions,
  selectedPrediction: routines.nba.prediction
})

const mapDispatchToProps = {
  fetchNBAPrediction,
  updateNBAMatchesModels
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduledModelSelector)
