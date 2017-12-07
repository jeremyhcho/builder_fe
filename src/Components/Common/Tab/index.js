import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Tab.scss'

class Tab extends React.Component {
  state = {
    selectedTabItem: this.getInitialSelected()
  }

  onClick = (tabItem) => {
    return (e) => {
      if (tabItem.key === this.state.selectedTabItem.key || tabItem.disabled) {
        return null
      }

      this.setState({ selectedTabItem: tabItem })
      return this.props.onChange(e, tabItem)
    }
  }

  getInitialSelected () {
    const { tabs, defaultKey } = this.props

    if (defaultKey) {
      return tabs.find(tabItem => tabItem.key === defaultKey)
    }

    return tabs[0]
  }

  render () {
    const { tabs, listStyle } = this.props

    return (
      <ul styleName='tabs' style={listStyle}>
        {
          tabs.map(tabItem => {
            const tabItemClass = classNames('tab-item', {
              selected: tabItem.key === this.state.selectedTabItem.key,
              disabled: tabItem.disabled === true
            })

            return (
              <li
                styleName={tabItemClass}
                onClick={this.onClick(tabItem)}
                key={tabItem.key}
              >
                {tabItem.label}
              </li>
            )
          })
        }
      </ul>
    )
  }
}

Tab.defaultProps = {
  defaultKey: undefined,
  listStyle: {}
}

Tab.propTypes = {
  tabs: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultKey: PropTypes.string,
  listStyle: PropTypes.object
}

export default Tab
