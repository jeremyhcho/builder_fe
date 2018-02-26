import React from 'react'
import PropTypes from 'prop-types'

// Components
import { InfoBubble } from 'Components/Common'

const impacts = {
  high: {
    text: 'High',
    color: 'var(--dark-red)'
  },
  medium: {
    text: 'Medium',
    color: 'var(--gold)'
  },
  low: {
    text: 'Low',
    color: 'var(--dark-green)'
  }
}

const StatDetail = ({ text, impact }) => (
  <InfoBubble pos="top" width={400} style={{ display: 'inline-block', marginLeft: '5px' }}>
    <p
      className='semibold'
      style={{ textAlign: 'left' }}
    >
      Impact: <span style={{ color: impacts[impact].color }}>{impacts[impact].text}</span>
    </p>
    <p
      className='label'
      style={{ textAlign: 'left', marginTop: '20px' }}
    >
      WHAT DOES THIS METRIC INDICATE?
    </p>

    <p style={{ textAlign: 'left', marginTop: '10px' }}>{text}</p>
  </InfoBubble>
)

StatDetail.propTypes = {
  text: PropTypes.string.isRequired,
  impact: PropTypes.string.isRequired
}

export default StatDetail
