import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Toggle } from 'Components/Common'

// Icons
import ChangeIcon from 'Assets/Icons/switch-arrows.svg'

// Actions
import { fetchNBAPredictions } from 'Actions'

// CSS
import './ModelView.scss'

class CompletedModelSelector extends React.Component {
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

  getResult (result) {
    if (!result) {
      return 'INACTIVE'
    }

    return result.toUpperCase()
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
              styleName="match-model"
              onClick={(e) => this.changeModel(e, matchModel)}
            >
              <Col xs={5}>
                <p className="label">Name</p>
                <p className="semibold clip">{matchModel.model.name}</p>
              </Col>

              <Col xs={3}>
                <p className="label">Type</p>
                <p className="semibold">{matchModel.model.type[0].toUpperCase() + matchModel.model.type.substr(1)}</p>
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
    const { selectedModel } = this.props

    return (
      <div styleName="model-selector">
        <div styleName="model-name">
          <h4 className="semibold">{selectedModel.name}</h4>
          <ChangeIcon style={{ margin: '0 10px', cursor: 'pointer' }} onClick={this.openModels} />

          {this.state.modelsOpen && this.renderModelList()}
        </div>
      </div>
    )
  }
}

CompletedModelSelector.defaultProps = {
  matchesModels: [],
  selectedModel: {}
}

CompletedModelSelector.propTypes = {
  matchesModels: PropTypes.array,
  selectedModel: PropTypes.object,
  fetchNBAPredictions: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  matchesModels: routines.nba.matchesModels,
  selectedModel: routines.nba.predictions
})

const mapDispatchToProps = {
  fetchNBAPredictions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedModelSelector)
