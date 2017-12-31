import React from 'react'
import PropTypes from 'prop-types'

const lineStyle = {
  display: 'inline-block',
  margin: '0 15px',
  width: '60px',
  lineHeight: '40px',
  verticalAlign: 'middle',
  border: '0',
  height: '1px',
  backgroundColor: 'var(--light-gray)'
}

const SubHeader = ({ text, subText }) => (
  <div style={{ textAlign: 'center', margin: '45px 0 15px' }}>
    <div style={{ margin: '0 auto 15px', display: 'inline-block' }}>
      <hr style={lineStyle} />
      <span className="semibold">
        {text}
      </span>
      <hr style={lineStyle} />
    </div>
    <div style={{ margin: '0 35%' }}>
      <span className="small label">{subText}</span>
    </div>
  </div>
)

SubHeader.defaultProps = {
  subText: ''
}

SubHeader.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string
}

export default SubHeader
