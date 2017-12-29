import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Slider } from 'Components/Common'

// CSS
import './EditModel.scss'

class Specs extends React.Component {
  nameToLabel(name) {
    return name.split('_').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')
  }

  render () {
    const { specs, changeSpecs } = this.props
    return (
      <div styleName="specs">
        {
          Object.keys(specs).map(stat => (
            <div key={stat} styleName="slider-container">
              <p className="semibold">{this.nameToLabel(stat)}</p>
              <Slider
                style={{ marginTop: '15px' }}
                name={stat}
                value={specs[stat]}
                min={0}
                max={10}
                onChange={changeSpecs}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

Specs.propTypes = {
  specs: PropTypes.object.isRequired,
  changeSpecs: PropTypes.func.isRequired
}

export default Specs
