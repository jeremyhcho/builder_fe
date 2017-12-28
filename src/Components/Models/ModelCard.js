import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { Row, Col } from 'react-styled-flexboxgrid'
import classNames from 'classnames'

// Components
import { Card, Toggle } from 'Components/Common'
import View from 'Assets/Icons/models/eye-17.svg'
import Edit from 'Assets/Icons/models/pen-01.svg'
import Delete from 'Assets/Icons/models/trash.svg'

// CSS
import './Models.scss'

// Actions
import { deleteNBAModel } from 'Actions'

const fakeLabel = []
for (let i = 0; i < 31; i++) {
  fakeLabel.push(i)
}

const fakeData = {
  label: 'fake',
  fill: true,
  lineTension: 0.1,
  cubicInterpolationMode: 'linear',
  backgroundColor: '#E5EDF0',
  borderColor: 'orange',
  borderWidth: '0.6px',
  pointBorderColor: '#9EB1BC',
  pointBackgroundColor: '#9EB1BC',
  pointBorderWidth: 1,
  pointHoverRadius: 2,
  pointRadius: 0,
  data: fakeLabel.map(num => Math.random() * num)
}

class ModelCard extends React.Component {
  state = {
    hovered: false,
    modelStatus: true
  }

  handleEnter = () => {
    this.setState({ hovered: true })
  }

  handleLeave = () => {
    this.setState({ hovered: false })
  }

  toggleStatus = () => {
    this.setState({ modelStatus: !this.state.modelStatus })
  }

  deleteModel = () => {
    this.props.deleteNBAModel(this.props.model.id)
  }

  renderOverlayActions () {
    const overlayStyles = classNames('overlay', {
      show: this.state.hovered
    })

    const { modelStatus } = this.state

    return (
      <div styleName={overlayStyles}>
        <div styleName="overlay-content">
          <div styleName="toggle">
            <p style={{ marginBottom: '-15px' }} className="label">{modelStatus ? 'Active' : 'Disabled'}</p>
            <Toggle
              checked={modelStatus}
              onChange={this.toggleStatus}
            />
          </div>
          <div styleName="buttons" onClick={this.viewModel}>
            <View />
          </div>
          <div styleName="buttons" onClick={this.editModel}>
            <Edit />
          </div>
          <div styleName="buttons" onClick={this.deleteModel}>
            <Delete />
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { model } = this.props
    const lowerStyle = classNames('lower', {
      fill: this.state.hovered
    })
    return (
      <div styleName="model-card" onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        <Card wrapperStyle={{ height: '100%', width: '100%' }} style={{ marginTop: '0' }}>
          <Row styleName="upper">
            <div>
              <p className="semibold">Standard</p>
              <h2 className="semibold">{model.name}</h2>
            </div>
            <div styleName="graph-wrapper">
              <Line
                data={{ labels: fakeLabel, datasets: [fakeData] }}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    xAxes: [{
                      ticks: {
                        fontSize: 9,
                        autoSkip: true,
                        maxTicksLimit: 2
                      }
                    }],
                    yAxes: [{
                      ticks: {
                        fontSize: 9
                      }
                    }]
                  }
                }}
              />
            </div>
          </Row>
          <Row styleName={lowerStyle} bottom='xs' center='xs'>
            {this.renderOverlayActions()}
            <Col xs={4}>
              <p className="semibold label">SEASON</p>
              <h3 className="semibold">42W - 27L</h3>
            </Col>
            <Col xs={4}>
              <p className="semibold label">
                WIN RATE <span style={{ color: 'var(--green)' }}>+3%</span>
              </p>
              <h3 className="semibold">60.5%</h3>
            </Col>
            <Col xs={4}>
              <p className="semibold label">LAST S</p>
              <h3 className="semibold">W3 - L2</h3>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

ModelCard.propTypes = {
  model: PropTypes.object.isRequired,
  deleteNBAModel: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  deleteNBAModel
}

export default connect(
  null,
  mapDispatchToProps
)(ModelCard)
