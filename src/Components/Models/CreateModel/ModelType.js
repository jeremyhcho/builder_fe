import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Icons
import BasicIcon from 'Assets/Icons/models/align-bottom.svg'
import AdvancedIcon from 'Assets/Icons/models/chart-bars.svg'

// CSS
import './CreateModel.scss'

const iconStyle = {
  width: '120px',
  height: '120px'
}

class ModelType extends React.Component {
  renderModelIcons () {
    const modelTypes = [
      {
        type: 'basic',
        icon: BasicIcon
      },
      {
        type: 'advanced',
        icon: AdvancedIcon
      }
    ]

    return modelTypes.map(({ type, icon: ModelIcon }) => {
      const modelTypeStyle = classNames('model-type-card', {
        selected: type === this.props.type
      })
      return (
        <div styleName={modelTypeStyle} key={type}>
          <ModelIcon style={iconStyle} />
          <p className="semibold">{type[0].toUpperCase() + type.substr(1)} Model</p>
        </div>
      )
    })
  }

  render () {
    return (
      <div styleName="model-type-container">
        {this.renderModelIcons()}
      </div>
    )
  }
}

ModelType.propTypes = {
  type: PropTypes.string.isRequired
}

export default ModelType
