import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Button, Spinner } from 'Components/Common'
import CreateModel from './CreateModel'
import ModelCard from './ModelCard'

// CSS
import './Models.scss'

// Actions
import { fetchNBAModels } from 'Actions'

class Models extends React.Component {
  state = {
    modalOpen: false
  }

  componentDidMount () {
    this.props.fetchNBAModels()
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  renderModelColor (index) {
    const colors = [
      '#4DA1A9',
      '#944654',
      '#3A4040',
      '#3C90DF'
    ]
    if (index < 4) return colors[index]
    return colors[4 % index]
  }

  renderModels () {
    const { modelList, fetchedModels } = this.props
    if (modelList.length && fetchedModels) {
      return modelList.map((model, index) => (
        <Col xs={6} key={model.id}>
          <ModelCard
            model={model}
            color={this.renderModelColor(index)}
          />
        </Col>
      ))
    } else if (!modelList.length && fetchedModels) {
      return (
        <Col xs={12}>
          <Row center='xs' middle='xs' style={{ height: '40vh', opacity: '0.2' }}>
            <div>
              <h1 className="bold">Looks like you haven't created any Models</h1>
              <h4 className="semibold">You can create a Model by clicking the Create Model button</h4>
            </div>
          </Row>
        </Col>
      )
    }
    return (
      <Col xs={12}>
        <Row center='xs' middle='xs' style={{ height: '40vh' }}>
          <Spinner lg show />
        </Row>
      </Col>
    )
  }

  render () {
    const { modalOpen } = this.state
    return (
      <div styleName="models">
        <Row>
          <Col xsOffset={10} xs={2}>
            <Button
              onClick={this.toggleModal}
            >
              <span style={{ marginRight: '5px', color: '#fff' }}>
                <i className="fa fa-plus" aria-hidden="true" />
              </span>
              Create Model
            </Button>
          </Col>

          {
            modalOpen &&
            <CreateModel toggle={this.toggleModal} isOpen />
          }
        </Row>

        <div styleName="model-list">
          <Row>
            {this.renderModels()}
          </Row>
        </div>
      </div>
    )
  }
}

Models.defaultProps = {
  modelList: []
}

Models.propTypes = {
  modelList: PropTypes.array,
  fetchNBAModels: PropTypes.func.isRequired,
  fetchedModels: PropTypes.bool.isRequired
}

const mapStateToProps = ({ nba }) => ({
  modelList: nba.models.modelList,
  fetchedModels: nba.models.fetchedModels
})

const mapDispatchToProps = {
  fetchNBAModels
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Models)
