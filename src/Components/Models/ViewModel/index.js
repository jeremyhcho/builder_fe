import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Modal } from 'Components/Common'
import ModelSummary from './ModelSummary'
import ModelHistory from './ModelHistory'

// CSS
import './ViewModel.scss'

class ViewModel extends React.Component {
  render () {
    const { model, toggle, isOpen } = this.props

    return (
      <Modal
        header={model.name}
        toggle={toggle}
        isOpen={isOpen}
      >
        <div styleName="view-model">
          <ModelSummary model={model} />
          <ModelHistory model={model} />
        </div>
      </Modal>
    )
  }
}

ViewModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
}

export default ViewModel
