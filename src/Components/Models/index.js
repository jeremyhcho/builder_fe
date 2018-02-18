import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Button, Spinner, DocumentTitle } from 'Components/Common'
import CreateModel from './CreateModel'
import ModelCard from './ModelCard'
import NoModelsIcon from 'Assets/Icons/missing-content.svg'

// CSS
import './Models.scss'

// Icons
import PlusIcon from 'Assets/Icons/plus.svg'

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
      { primary: '#4DA1A9', secondary: 'rgba(77, 161, 169, 0.4)' },
      { primary: '#944654', secondary: 'rgba(148, 70, 84, 0.4)' },
      { primary: '#3A4040', secondary: 'rgba(58, 64, 64, 0.4)' },
      { primary: '#3C90DF', secondary: 'rgba(60, 144, 223, 0.4)' }
    ]
    if (index < 4) return colors[index]
    return colors[index % 4]
  }

  renderModels () {
    const { models } = this.props

    if (!models.length) {
      return (
        <Row style={{ position: 'relative', height: '100%' }}>
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
        </Row>
      )
    }

    return (
      <Row styleName="model-list">
        {
          models.sort((a, b) => a.id - b.id).map((model, index) => (
            <Col key={model.id}>
              <ModelCard
                model={model}
                color={this.renderModelColor(index)}
              />
            </Col>
          ))
        }
      </Row>
    )
  }

  render () {
    const { modalOpen } = this.state
    const { fetchingModels, models } = this.props

    if (fetchingModels || !models) {
      return (
        <div className="loader">
          <Spinner lg show />
        </div>
      )
    }

    return (
      <DocumentTitle title='Quartz - NBA Models' header='Models'>
        <div styleName="models">
          <Row styleName="model-header">
            <Col xs={2}>
              <Button
                onClick={this.toggleModal}
                style={{ position: 'relative' }}
              >
                <PlusIcon
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />

                <span style={{ marginLeft: '20px' }}>Create Model</span>
              </Button>
            </Col>

            <CreateModel toggle={this.toggleModal} isOpen={modalOpen} />
          </Row>

          {this.renderModels()}
        </div>
      </DocumentTitle>
    )
  }
}

Models.defaultProps = {
  models: null,
  fetchingModels: false
}

Models.propTypes = {
  models: PropTypes.array,
  fetchNBAModels: PropTypes.func.isRequired,
  fetchingModels: PropTypes.bool,
}

const mapStateToProps = ({ routines }) => ({
  models: routines.nba.models,
  fetchingModels: routines.isLoading.FETCH_NBA_MODELS
})

const mapDispatchToProps = {
  fetchNBAModels
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Models)
