import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Toggle } from 'Components/Common/Button'

// CSS
import './../Elements.scss'

const DefaultToggle = ({ checked }) => {
  return (
    <div styleName="button-container">
      <p className='bold' styleName='label'>
        { checked ? 'On' : 'Off' }
      </p>
      { checked ? <Toggle checked /> : <Toggle /> }
    </div>
  )
}

DefaultToggle.propTypes = {
  checked: PropTypes.bool
}

DefaultToggle.defaultProps = {
  checked: false,
}

export default DefaultToggle
