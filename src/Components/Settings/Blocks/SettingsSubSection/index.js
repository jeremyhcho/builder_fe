import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './SettingsSubSection.scss'

const SettingsSubSection = ({
  label,
  icon: Icon,
  children,
  subText,
  headerButton: HeaderButton
}) => (
  <div styleName="settings-subsection">
    <div styleName="section-header">
      <div>
        <Icon style={{ marginRight: '10px' }} />
        <p className="small">{label.toUpperCase()} {subText && <span className="label"> - {subText}</span>}</p>
      </div>

      <div>
        {HeaderButton && <HeaderButton />}
      </div>
    </div>

    {/* <hr /> */}

    <div styleName="section-body">
      {children}
    </div>
  </div>
)

SettingsSubSection.defaultProps = {
  icon: () => null,
  children: null,
  subText: '',
  headerButton: null
}

SettingsSubSection.propTypes = {
  label: PropTypes.string.isRequired,
  subText: PropTypes.string,
  icon: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  headerButton: PropTypes.func
}

export default SettingsSubSection
