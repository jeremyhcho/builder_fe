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
import { fetchNBAPrediction } from 'Actions'

// CSS
import './ModelSelector.scss'

class CompletedModelSelector extends React.Component {
  state = {
    modelsOpen: false,
    hovered: false
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

  getResult (result) {
    if (!result) {
      return 'INACTIVE'
    }

    return result.toUpperCase()
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
                <div ref={ref => this.toggleCol = ref}>
                  <Toggle
                    name={matchModel.id}
                    disabled
                    checked={this.checkModelStatus(matchModel.status)}
                    onChange={() => null}
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

CompletedModelSelector.defaultProps = {
  predictions: [],
  selectedPrediction: {}
}

CompletedModelSelector.propTypes = {
  predictions: PropTypes.array,
  selectedPrediction: PropTypes.object,
  fetchNBAPrediction: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  predictions: routines.nba.predictions,
  selectedPrediction: routines.nba.prediction
})

const mapDispatchToProps = {
  fetchNBAPrediction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedModelSelector)
