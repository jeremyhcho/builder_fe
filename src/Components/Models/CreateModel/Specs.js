import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Slider } from 'Components/Common'

// CSS
import './CreateModel.scss'

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
            <Row key={stat} styleName="slider-container" middle='xs'>
              <Col xs={3}>
                <p>{this.nameToLabel(stat)}</p>
              </Col>
              <Col xs={9} style={{ paddingRight: '35px' }}>
                <Slider
                  name={stat}
                  value={specs[stat]}
                  min={0}
                  max={10}
                  onChange={changeSpecs}
                  showInputControl
                />
              </Col>
            </Row>
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
