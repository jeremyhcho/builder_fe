import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './SubSection.scss'

const SubSection = ({ label, icon: Icon, children }) => (
  <div styleName="sub-section">
    <div styleName="section-header">
      <Icon style={{ marginRight: '10px' }} />
      <p className="semibold">{label}</p>
    </div>

    <div styleName="section-body">
      {children}
    </div>

    <hr />
  </div>
)

SubSection.defaultProps = {
  icon: () => null
}

SubSection.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired
}

export default SubSection
