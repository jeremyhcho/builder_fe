import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Modal, Spinner } from 'Components/Common'
import ModelSummary from './ModelSummary'
import ModelHistory from './ModelHistory'

// CSS
import './ViewModel.scss'

// Actions
import { fetchNBAModel } from 'Actions'

// Helpers
import { makeGetModelPredictions } from 'Helpers/Selectors'

class ViewModel extends React.Component {
  componentDidMount () {
    this.props.fetchNBAModel(this.props.model.id)
  }

  render () {
    const { model, toggle, isOpen, predictions } = this.props
    console.log(predictions)

    return (
      <Modal
        header={model.name}
        toggle={toggle}
        isOpen={isOpen}
        wrapperStyle={{ width: '800px', maxWidth: '100%', height: '600px' }}
      >
        <div styleName="view-model">
          {
            predictions ? (
              [
                <ModelSummary key="summary" predictions={predictions} />,
                <ModelHistory key="history" predictions={predictions} />
              ]
            ) : (
              <div style={{ textAlign: 'center', padding: '200px 0' }}>
                <Spinner lg show />
              </div>
            )
          }
        </div>
      </Modal>
    )
  }
}

ViewModel.defaultProps = {
  predictions: null
}

ViewModel.propTypes = {
  predictions: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  fetchNBAModel: PropTypes.func.isRequired
}

const makeMapStateToProps = () => {
  const getPredictions = makeGetModelPredictions()
  return ({ routines }) => ({
    predictions: getPredictions(routines)
  })
}

const mapDispatchToProps = {
  fetchNBAModel
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ViewModel)
