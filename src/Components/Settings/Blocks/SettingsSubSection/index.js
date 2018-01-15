import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './SettingsSubSection.scss'

const SettingsSubSection = ({ label, icon: Icon, children, subText }) => (
  <div styleName="settings-subsection">
    <div styleName="section-header">
      <Icon style={{ marginRight: '10px' }} />
      <p className="semibold">{label} {subText && <span className="label"> - {subText}</span>}</p>
    </div>

    <hr />

    <div styleName="section-body">
      {children}
    </div>
  </div>
)

SettingsSubSection.defaultProps = {
  icon: () => null,
  children: null,
  subText: ''
}

SettingsSubSection.propTypes = {
  label: PropTypes.string.isRequired,
  subText: PropTypes.string,
  icon: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default SettingsSubSection
