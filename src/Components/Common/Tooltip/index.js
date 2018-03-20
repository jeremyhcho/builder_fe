import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Tooltip.scss'

class Tooltip extends React.Component {
  state = {
    hovered: false
  }

  componentDidMount () {
    this.target = document.querySelector(`[data-tip-for='${this.props.id}']`)

    if (!this.props.cta) {
      if ('ontouchstart' in window) {
        console.log('Tooltips in mobile are disabled')
      } else {
        this.target.addEventListener('mouseenter', this.openToolTip)
        this.target.addEventListener('mouseleave', this.closeToolTip)
      }
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.toggle && !this.props.toggle) {
      this.setState({ hovered: true })
    }

    if (!newProps.toggle && this.props.toggle) {
      this.setState({ hovered: false })
    }
  }

  componentWillUnmount () {
    if (!this.props.cta) {
      if ('ontouchstart' in window) {
        console.log('Tooltips in mobile are disabled')
      } else {
        this.target.removeEventListener('mouseenter', this.openToolTip)
        this.target.removeEventListener('mouseleave', this.closeToolTip)
      }
    }
  }

  getPos () {
    if (!this.target) {
      return null
    }

    // let x = 0;
    // let y = 0;
    // let currentElement = this.target
    const targetDimensions = this.target.getBoundingClientRect()
    const tooltipDimensions = this.tooltip.getBoundingClientRect()

    // while (currentElement) {
    //   x += (currentElement.offsetLeft - currentElement.scrollLeft + currentElement.clientLeft)
    //   y += (currentElement.offsetTop - currentElement.scrollTop + currentElement.clientTop)
    //   currentElement = currentElement.parentNode
    // }

    switch (this.props.pos) {
      case 'top':
        return this.topPos(targetDimensions, tooltipDimensions)
      case 'left':
        return this.leftPos(targetDimensions, tooltipDimensions)
      case 'right':
        return this.rightPos(targetDimensions, tooltipDimensions)
      case 'bottom':
        return this.bottomPos(targetDimensions, tooltipDimensions)
      default:
        return this.topPos(targetDimensions, tooltipDimensions)
    }
  }

  openToolTip = () => {
    this.setState({ hovered: true })
  }

  closeToolTip = () => {
    this.setState({ hovered: false })
  }

  topPos ({ width: targetWidth, x, y }, { height: tooltipHeight, width: tooltipWidth }) {
    return ({
      top: y - tooltipHeight - 8,
      left: x - (tooltipWidth / 2) + (targetWidth / 2)
    })
  }

  leftPos ({ height: targetHeight, x, y }, { height: tooltipHeight, width: tooltipWidth }) {
    return ({
      top: y + (targetHeight / 2) - (tooltipHeight / 2),
      left: x - tooltipWidth - 8
    })
  }

  rightPos ({ height: targetHeight, width: targetWidth, x, y }, { height: tooltipHeight }) {
    return ({
      top: y + (targetHeight / 2) - (tooltipHeight / 2),
      left: x + targetWidth + 8
    })
  }

  bottomPos ({ height: targetHeight, width: targetWidth, x, y }, { width: tooltipWidth }) {
    return ({
      top: y + targetHeight + 8,
      left: x - (tooltipWidth / 2) + (targetWidth / 2)
    })
  }

  toolTipStyles () {
    return this.getPos()
  }

  render () {
    const { hovered } = this.state

    const tooltipClass = classNames('tooltip', {
      hovered
    })

    const overlayClass = classNames('tooltip-overlay', {
      hide: !hovered
    })

    if (this.props.cta) {
      return (
        [
          <div styleName={overlayClass} key='overlay' />,
          <div
            data-pos={this.props.pos}
            styleName={tooltipClass}
            style={this.toolTipStyles()}
            ref={tooltip => this.tooltip = tooltip}
            key='tooltip'
          >
            {this.props.children}
          </div>
        ]
      )
    }

    return (
      <div
        data-pos={this.props.pos}
        styleName={tooltipClass}
        style={this.toolTipStyles()}
        ref={tooltip => this.tooltip = tooltip}
      >
        {this.props.children}
      </div>
    )
  }
}

Tooltip.defaultProps = {
  cta: false,
  toggle: false
}

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  toggle: PropTypes.bool,
  cta: PropTypes.bool
}

export default Tooltip
