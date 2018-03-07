import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Fields } from 'redux-form'

// Components & Icons
import { Button } from 'Components/Common'
import ModelSpecsInfo from './ModelSpecsInfo'
import SpecSliders from './SpecSliders'

// CSS
import './ModelSpecs.scss'

// Helpers
import specKeys from '../specKeys'

const ModelSpecs = ({ creatingModel, updatingModel }) => {
  const renderSubmitButton = () => {
    if (updatingModel || creatingModel) {
      return <Button loading />
    }

    return <Button type="submit">Create model</Button>
  }

  return (
    <div styleName="model-specs">
      <div styleName='model-create-row'>
        <div styleName="label">
          <p className="label">Specs</p>

          <span>
            <ModelSpecsInfo />
          </span>
        </div>

        <div styleName="input">
          <Fields
            names={specKeys}
            component={SpecSliders}
          />
        </div>
      </div>

      <div styleName="cta">
        {renderSubmitButton()}
      </div>
    </div>
  )
}

ModelSpecs.defaultProps = {
  creatingModel: false,
  updatingModel: false
}

ModelSpecs.propTypes = {
  creatingModel: PropTypes.bool,
  updatingModel: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  creatingModel: routines.isLoading.CREATE_NBA_MODEL,
  updatingModel: routines.isLoading.UPDATE_NBA_MODEL
})

export default connect(
  mapStateToProps
)(ModelSpecs)
