import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Button, Spinner } from 'Components/Common'
import CreateModel from './CreateModel'
import ModelCard from './ModelCard'
import NoModelsIcon from 'Assets/Icons/models/no-models.svg'

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
    return colors[index % 4]
  }

  renderModels () {
    const { modelList, fetchingModels } = this.props

    if (fetchingModels) {
      return (
        <Col xs={12}>
          <Row center='xs' middle='xs' style={{ height: '40vh' }}>
            <Spinner lg show />
          </Row>
        </Col>
      )
    }

    if (!modelList.length) {
      return (
        <div styleName="model-overlay">
          <div style={{ textAlign: 'center' }}>
            <NoModelsIcon height={256} width={256} />

            <h1 className="bold" style={{ marginTop: '15px' }}>
              Ready to get started?
            </h1>
            <p className='semibold' style={{ marginTop: '5px' }}>
              Create your first model by clicking the 'Create Model' button
            </p>
          </div>
        </div>
      )
    }

    return (
      <div styleName="model-list">
        {
          modelList.map((model, index) => (
            <ModelCard
              key={model.id}
              model={model}
              color={this.renderModelColor(index)}
            />
          ))
        }
      </div>
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
              style={{ position: 'relative' }}
            >
              <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
                <i
                  className="fa fa-plus"
                  aria-hidden="true"
                  style={{ color: '#fff', fontSize: '9px' }}
                />
              </span>

              <span style={{ marginLeft: '15px' }}>Create Model</span>
            </Button>
          </Col>

          {
            modalOpen &&
            <CreateModel toggle={this.toggleModal} isOpen />
          }
        </Row>

        <Row style={{ position: 'relative', height: '100%' }}>
          {this.renderModels()}
        </Row>
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
  fetchingModels: PropTypes.bool.isRequired
}

const mapStateToProps = ({ nba }) => ({
  modelList: nba.models.modelList,
  fetchingModels: nba.models.fetchingModels
})

const mapDispatchToProps = {
  fetchNBAModels
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Models)
