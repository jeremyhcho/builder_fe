import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import SelectItem from './SelectItem'

// CSS
import './Select.scss'

class Select extends React.Component {
  state = {
    open: false,
    vertReversed: this.props.verticalReverse,
    horReversed: this.props.horizontalReverse,
    displayText: this.parseDefaultText(),
    searchVal: ''
  }

  componentWillReceiveProps (newProps) {
    if (newProps.selectedVal !== this.props.selectedVal) {
      const label = this.props.options.find(option => (
        option.value === newProps.selectedVal
      )).label

      this.setState({ displayText: label })
    }
  }

  onBlur = () => {
    this.setState({ open: false, searchVal: '' })
  }

  onListClick = (e) => {
    if (e.target.tagName === 'UL' || e.target.className.includes('disabled')) { return }

    this.setState({ open: false })
  }

  handleClick = (e, { value, label }) => {
    const { selectedVal, onChange } = this.props

    if (selectedVal !== value) {
      onChange({ value, label }, e)
    }
  }

  parseDefaultText () {
    const { selectedVal, options, defaultText } = this.props

    if (selectedVal) {
      return options.find(option => option.value === selectedVal)
    }

    return defaultText || options[0].label
  }

  toggleDropdown = () => {
    this.setState({ open: !this.state.open, searchVal: '' })
  }

  reversedStyles () {
    const { vertReversed, horReversed } = this.state
    const styles = {}

    if (vertReversed) {
      styles.top = 'auto'
      styles.bottom = 'calc(100% + 8px)'
    }

    if (horReversed) {
      styles.left = 'auto'
      styles.right = '0'
    }

    return styles
  }

  renderOptions () {
    let options = this.props.options

    if (this.props.search) {
      options = this.props.options.filter(option => (
        option.label.toLowerCase().includes(this.state.searchVal)
      ))
    }

    if (options.length) {
      return options.map(option => (
        <SelectItem
          key={option.value}
          option={option}
          onClick={this.handleClick}
        />
      ))
    }

    return (
      <li style={{ fontSize: '13px', minWidth: '150px', padding: '10px' }}>
        No matches found
      </li>
    )
  }

  renderInnerSelect () {
    const { vertReversed, displayText, open, searchVal } = this.state
    const { search, defaultText } = this.props
    const dropdownClass = classNames('dropdown', { open })
    const chevronClass = classNames('chevron-down', { open })

    let displayValue

    if (search) {
      if (displayText !== defaultText) {
        displayValue = displayText
      } else if (searchVal) {
        displayValue = searchVal
      } else if (open) {
        displayValue = ''
      } else if (displayText === defaultText) {
        displayValue = defaultText
      } else {
        displayValue = displayText
      }

      return (
        <div
          styleName={dropdownClass}
          onClick={this.toggleDropdown}
        >
          <input
            type='text'
            value={displayValue}
            onChange={(e) => this.setState({ searchVal: e.target.value })}
          />
        </div>
      )
    }

    return (
      <div
        styleName={dropdownClass}
        onClick={this.toggleDropdown}
      >
        <span>{displayText}</span>
        <span>
          <i
            className={vertReversed ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}
            styleName={chevronClass}
          />
        </span>
      </div>
    )
  }

  render () {
    const { wrapperStyle } = this.props
    const { open } = this.state

    const optionsClass = classNames('options', { open })

    return (
      <div
        style={{ ...wrapperStyle, position: 'relative', display: 'inline-block' }}
        onBlur={this.onBlur}
        tabIndex='0'
      >
        {this.renderInnerSelect()}

        <ul
          style={this.reversedStyles()}
          styleName={optionsClass}
          onClick={this.onListClick}
          ref={dropdown => this.dropdown = dropdown}
        >
          {this.renderOptions()}
        </ul>
      </div>
    )
  }
}

Select.defaultProps = {
  verticalReverse: false,
  horizontalReverse: false,
  wrapperStyle: {},
  selectedVal: '',
  options: [],
  search: false
}

Select.propTypes = {
  defaultText: PropTypes.string.isRequired,
  verticalReverse: PropTypes.bool,
  horizontalReverse: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  options: PropTypes.array.isRequired,
  selectedVal: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  search: PropTypes.bool
}

export default Select
