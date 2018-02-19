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
import { clearRoutine } from 'Routines'

/* eslint-disable react/no-unused-prop-types */
class ViewModel extends React.Component {
  componentWillReceiveProps (newProps) {
    if (newProps.isOpen && !this.props.isOpen) {
      this.props.fetchNBAModel(newProps.modelId, { with_predictions: true })
    }
  }

  toggleAndClearState = () => {
    this.props.clearRoutine(['nba', 'model'])
    this.props.toggle()
  }

  render () {
    const { model, isOpen } = this.props

    if (!model.id) {
      return (
        <Modal
          header='Model Details'
          isOpen={isOpen}
          wrapperStyle={{ width: '800px', maxWidth: '100%', height: '600px' }}
          toggle={this.toggleAndClearState}
        >
          <div style={{ textAlign: 'center', padding: '200px 0' }}>
            <Spinner lg show />
          </div>
        </Modal>
      )
    }

    return (
      <Modal
        header={model.name}
        toggle={this.toggleAndClearState}
        isOpen={isOpen}
        wrapperStyle={{ width: '800px', maxWidth: '100%', height: '600px' }}
      >
        <div styleName="view-model">
          {
            [
              <ModelSummary key="summary" model={model} />,
              <ModelHistory key="history" model={model} />
            ]
          }
        </div>
      </Modal>
    )
  }
}

ViewModel.defaultProps = {
  model: {}
}

ViewModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modelId: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  fetchNBAModel: PropTypes.func.isRequired,
  clearRoutine: PropTypes.func.isRequired,
  model: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  model: routines.nba.model
})

const mapDispatchToProps = {
  fetchNBAModel,
  clearRoutine
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewModel)
