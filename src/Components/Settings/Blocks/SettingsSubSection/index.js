import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './SettingsSubSection.scss'

const SettingsSubSection = ({
  label,
  // icon: Icon,
  children,
  subText,
  noBox,
  warning,
  headerButton: HeaderButton
}) => (
  <div styleName="settings-subsection">
    <div styleName="section-header">
      <div style={{ width: '100%', display: 'flex' }}>
        {/* <Icon style={{ marginRight: '10px' }} /> */}
        <p className="small" style={{ flex: '1' }}>{label.toUpperCase()} {subText && <span className="label"> - {subText}</span>}</p>
        <p className="small" style={{ color: 'var(--red)', flex: '2' }}>{warning}</p>
      </div>

      <div>
        {HeaderButton && <HeaderButton />}
      </div>
    </div>

    <div styleName={classNames('section-body', { noBox })}>
      {children}
    </div>
  </div>
)

SettingsSubSection.defaultProps = {
  // icon: () => null,
  children: null,
  subText: '',
  headerButton: null,
  noBox: false,
  warning: ''
}

SettingsSubSection.propTypes = {
  label: PropTypes.string.isRequired,
  subText: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  warning: PropTypes.string,
  // icon: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  headerButton: PropTypes.func,
  noBox: PropTypes.bool
}

export default SettingsSubSection
