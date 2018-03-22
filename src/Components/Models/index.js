import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components & Icons
import { Button, DocumentTitle, Tooltip } from 'Components/Common'
import { CongratulationsCue } from 'Components/Cues'
import DelayedLoader from 'Layouts/Loading/DelayedLoader'
import ModelCard from './ModelCard'
import NoModelsIcon from 'Assets/Icons/missing-content.svg'

// CSS
import './Models.scss'

// Icons
import PlusIcon from 'Assets/Icons/plus.svg'

// Actions
import {
  fetchNBAModels,
  openNBAIntroCreateModelCue,
  openNBAIntroSubmitModelCue,
  closeNBAIntroCue
} from 'Actions'

class Models extends React.Component {
  componentDidMount () {
    this.props.fetchNBAModels()

    if (this.props.modelNavigateCue) {
      this.props.openNBAIntroCreateModelCue()
    }
  }

  navigateToCreateModel = () => {
    this.props.history.push({
      pathname: '/models/create',
      state: { from: '/models' }
    })

    if (this.props.modelCreateCue) {
      this.props.openNBAIntroSubmitModelCue()
    }
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


  renderError () {
    const { location } = this.props

    if (location.state && location.state.error) {
      return location.state.error
    }

    return ''
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

  renderIntroCue () {
    const { modelCreateCue, closeNBAIntroCue, congratulationsCue } = this.props

    if (modelCreateCue) {
      return (
        <Tooltip
          id='model-create-cue'
          pos='right'
          cta={modelCreateCue}
          toggle={modelCreateCue}
          style={{ maxWidth: '300px' }}
        >
          <div style={{ textAlign: 'left' }}>
            <p style={{ lineHeight: '20px', marginBottom: '10px' }}>
              You don't have any models created currently.
              {' '} Click the button to Create your first model.
            </p>

            <p
              className="small label"
              style={{ cursor: 'pointer' }}
              onClick={() => closeNBAIntroCue()}
            >
              Hide these tips
            </p>
          </div>
        </Tooltip>
      )
    }

    if (congratulationsCue) {
      return <CongratulationsCue />
    }

    return null
  }

  render () {
    const { fetchingModels, models } = this.props

    if (fetchingModels || !models) {
      return <DelayedLoader />
    }

    return (
      <DocumentTitle title='Quze - NBA Models' header='Models'>
        <div styleName="models">
          <header styleName="model-header">
            <div>
              <Button
                onClick={this.navigateToCreateModel}
                style={{ position: 'relative' }}
                data-tip-for='model-create-cue'
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

              {this.renderIntroCue()}
            </div>

            <p className="small" style={{ color: 'var(--red)', marginTop: '10px' }}>
              {this.renderError()}
            </p>
          </header>

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
  history: PropTypes.object.isRequired,
  fetchNBAModels: PropTypes.func.isRequired,
  fetchingModels: PropTypes.bool,
  location: PropTypes.object.isRequired,
  modelNavigateCue: PropTypes.bool.isRequired,
  modelCreateCue: PropTypes.bool.isRequired,
  congratulationsCue: PropTypes.bool.isRequired,
  openNBAIntroCreateModelCue: PropTypes.func.isRequired,
  openNBAIntroSubmitModelCue: PropTypes.func.isRequired,
  closeNBAIntroCue: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines, cues }) => ({
  models: routines.nba.models,
  fetchingModels: routines.isLoading.FETCH_NBA_MODELS,
  modelCreateCue: cues.intro.modelCreate,
  congratulationsCue: cues.intro.congratulationsModal,
  modelNavigateCue: cues.intro.modelNavigate
})

const mapDispatchToProps = {
  fetchNBAModels,
  openNBAIntroCreateModelCue,
  openNBAIntroSubmitModelCue,
  closeNBAIntroCue
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Models)
