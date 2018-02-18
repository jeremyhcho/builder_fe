import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { Row, Col } from 'react-styled-flexboxgrid'
// import classNames from 'classnames'

// Components
import { Card, Toggle, Tooltip } from 'Components/Common'
import CreateModel from './CreateModel'
import DeleteModel from './DeleteModel'
import ViewModel from './ViewModel'
import View from 'Assets/Icons/models/eye-17.svg'
import Edit from 'Assets/Icons/models/pen-01.svg'
import Delete from 'Assets/Icons/models/trash.svg'

// CSS
import './Models.scss'

// Actions
import { updateNBAModel } from 'Actions'

// Helpers
import { nbaFlatStat } from 'Helpers'

class ModelCard extends React.Component {
  state = {
    hovered: false,
    editModel: false,
    deleteModel: false,
    viewModel: false
  }

  handleEnter = () => {
    this.setState({ hovered: true })
  }

  handleLeave = () => {
    this.setState({ hovered: false })
  }

  toggleStatus = () => {
    const { updateNBAModel, model } = this.props
    let newStatus

    if (model.status === 'ACTIVE') {
      newStatus = 'INACTIVE'
    } else {
      newStatus = 'ACTIVE'
    }

    updateNBAModel(model.id, {
      model: {
        name: model.name,
        specs: model.specs,
        status: newStatus
      }
    })
  }

  toggleModal = () => {
    this.setState({ editModel: !this.state.editModel })
  }

  toggleDeleteModal = () => {
    this.setState({ deleteModel: !this.state.deleteModel })
  }

  toggleViewModal = () => {
    this.setState({ viewModel: !this.state.viewModel })
  }

  checkModelStatus () {
    if (this.props.model.status === 'ACTIVE') {
      return true
    }
    return false
  }

  renderData () {
    const { model } = this.props

    const labels = Object.keys(model.specs).map(spec => nbaFlatStat(spec))
    const datasets = [
      {
        backgroundColor: this.renderColor().secondary,
        borderColor: this.renderColor().primary,
        borderWidth: 1,
        data: Object.values(model.specs).map(specValue => {
          if (specValue === '0') return '0.1'
          return specValue
        })
      }
    ]

    return { labels, datasets }
  }

  renderColor () {
    if (this.props.model.status === 'INACTIVE') {
      return {
        primary: '#D1D8DB',
        secondary: 'rgba(209, 216, 219, 0.4)'
      }
    }
    return this.props.color
  }

  render () {
    const { model } = this.props
    const { editModel, deleteModel, viewModel } = this.state

    const options = {
      legend: {
        display: false
      },
      animation: {
        duration: 0
      },
      tooltips: {
        enabled: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 10,
            padding: 4,
            min: 0,
            max: 10
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 7,
            callback: (label) => label.short,
          },
          gridLines: {
            display: false
          }
        }]
      }
    }

    return (
      <Card
        style={{
          margin: '0 15px 15px 0',
          display: 'inline-block'
        }}
      >
        <div styleName="model-card">
          <Row
            styleName="header"
            style={{
              backgroundColor: this.renderColor().primary
            }}
          >
            <Col>
              <p>
                {model.type[0].toUpperCase() + model.type.substr(1)}
                {!this.checkModelStatus() && ' - Inactive'}
              </p>
              <h4 className="semibold">{model.name}</h4>
            </Col>
          </Row>

          <Row center='xs' styleName="bar-graph">
            <Bar
              data={this.renderData()}
              options={options}
            />
          </Row>

          <Row styleName="actions" middle='xs'>
            <Col xs={6}>
              <Toggle
                checked={this.checkModelStatus()}
                onChange={this.toggleStatus}
              />
            </Col>

            <Col xs={2}>
              <div styleName="buttons" onClick={this.toggleViewModal} data-tip-for={`view-${model.id}`}>
                <View />
                <Tooltip id={`view-${model.id}`} pos='top'>View</Tooltip>
              </div>

              <ViewModel
                isOpen={viewModel}
                toggle={this.toggleViewModal}
                model={model}
              />
            </Col>

            <Col xs={2}>
              <div styleName="buttons" onClick={this.toggleModal} data-tip-for={`edit-${model.id}`}>
                <Edit />
                <Tooltip id={`edit-${model.id}`} pos='top'>Edit</Tooltip>
              </div>

              <CreateModel
                isOpen={editModel}
                toggle={this.toggleModal}
                model={model}
              />
            </Col>

            <Col xs={2}>
              <div styleName="buttons" onClick={this.toggleDeleteModal} data-tip-for={`delete-${model.id}`}>
                <Delete />
                <Tooltip id={`delete-${model.id}`} pos='top'>Delete</Tooltip>
              </div>

              <DeleteModel
                isOpen={deleteModel}
                toggle={this.toggleDeleteModal}
                model={model}
              />
            </Col>
          </Row>
        </div>
      </Card>
    )
  }
}

ModelCard.propTypes = {
  model: PropTypes.object.isRequired,
  updateNBAModel: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  updateNBAModel
}

export default connect(
  null,
  mapDispatchToProps
)(ModelCard)
