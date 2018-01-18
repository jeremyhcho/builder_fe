import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Toggle } from 'Components/Common'

// Icons
import ChangeIcon from 'Assets/Icons/arrows.svg'

// Actions
import { changeSelectedModel, updateNBAMatchesModels } from 'Actions'

// CSS
import './ModelView.scss'

class ModelSelector extends React.Component {
  state = {
    modelsOpen: false
  }

  componentWillReceiveProps (newProps) {
    if (newProps.selectedModel.id !== this.props.selectedModel.id) {
      this.openModels()
    }
  }

  changeModel = (e, model) => {
    if (this.toggleCol.contains(e.target)) {
      return null
    }

    return this.props.changeSelectedModel(model)
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

  changeModelStatus = (model) => {
    let newStatus
    if (model.status === 'ACTIVE') {
      newStatus = 'INACTIVE'
    } else {
      newStatus = 'ACTIVE'
    }

    this.props.updateNBAMatchesModels(model.id, {
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
          this.props.matchesModels.map(model => (
            <Row
              key={model.id}
              middle='xs'
              styleName="model-attr"
              onClick={(e) => this.changeModel(e, model)}
            >
              <Col xs={6}>
                <p className="label">Name</p>
                <p className="semibold">{model.name}</p>
              </Col>

              <Col xs={4}>
                <p className="label">Type</p>
                <p className="semibold">{model.type[0].toUpperCase() + model.type.substr(1)}</p>
              </Col>

              <Col xs={2}>
                <div ref={ref => this.toggleCol = ref}>
                  <Toggle
                    name={model.id}
                    checked={this.checkModelStatus(model.status)}
                    onChange={() => this.changeModelStatus(model)}
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

    return (
      <div styleName="model-selector">
        <div styleName="model-name">
          <h4 className="semibold">{selectedModel.name}</h4>
          <ChangeIcon style={{ margin: '0 10px' }} onClick={this.openModels} />

          {this.state.modelsOpen && this.renderModelList()}
        </div>

        <Row middle='xs' between='xs' styleName="model-stats">
          <div styleName="stats-card">
            <h4 className="semibold">{selectedModel.type[0].toUpperCase() + selectedModel.type.substr(1)}</h4>
            <p className="label">Type</p>
          </div>

          <div styleName="stats-card">
            <h4 className="semibold">13W - 27L</h4>
            <p className="label">Record</p>
          </div>

          <div styleName="stats-card">
            <h4 className="semibold">100%</h4>
            <p className="label">Win %</p>
          </div>

          <div styleName="stats-card">
            <h4 className="semibold">3W</h4>
            <p className="label">Streak</p>
          </div>

          <div styleName="stats-card">
            <h4 className="semibold">3W - 2L</h4>
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
  changeSelectedModel: PropTypes.func.isRequired,
  updateNBAMatchesModels: PropTypes.func.isRequired
}

const mapStateToProps = ({ nba }) => ({
  matchesModels: nba.gameDetails.models.matchesModels,
  selectedModel: nba.gameDetails.models.selectedModel
})

const mapDispatchToProps = {
  changeSelectedModel,
  updateNBAMatchesModels
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelSelector)
