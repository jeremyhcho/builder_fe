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
    this.target = document.querySelector(`[data-tip-for=${this.props.id}]`)
    this.target.addEventListener('mouseenter', this.mouseEnter)
    this.target.addEventListener('mouseleave', this.mouseLeave)
  }

  componentWillUnmount () {
    this.target.removeEventListener('mouseenter', this.mouseEnter)
    this.target.removeEventListener('mouseleave', this.mouseLeave)
  }

  getPos () {
    if (!this.target) {
      return null
    }

    let x = 0;
    let y = 0;
    let currentElement = this.target

    while (currentElement) {
      x += (currentElement.offsetLeft - currentElement.scrollLeft + currentElement.clientLeft)
      y += (currentElement.offsetTop - currentElement.scrollTop + currentElement.clientTop)
      currentElement = currentElement.offsetParent
    }

    switch (this.props.pos) {
      case 'top':
        return this.topPos(x, y)
      case 'left':
        return this.leftPos(x, y)
      case 'right':
        return this.rightPos(x, y)
      case 'bottom':
        return this.bottomPos(x, y)
      default:
        return this.topPos(x, y)
    }
  }

  mouseEnter = () => {
    this.setState({ hovered: true })
  }

  mouseLeave = () => {
    this.setState({ hovered: false })
  }

  topPos (x, y) {
    return ({
      top: y - this.tooltip.offsetHeight - 8,
      left: x - (this.tooltip.offsetWidth / 2) + (this.target.offsetWidth / 2)
    })
  }

  leftPos (x, y) {
    return ({
      top: y + (this.target.offsetHeight / 2) - (this.tooltip.offsetHeight / 2),
      left: x - this.tooltip.offsetWidth - 8
    })
  }

  rightPos (x, y) {
    return ({
      top: y + (this.target.offsetHeight / 2) - (this.tooltip.offsetHeight / 2),
      left: x + this.target.offsetWidth + 8
    })
  }

  bottomPos (x, y) {
    return ({
      top: y + this.target.offsetHeight + 8,
      left: x - (this.tooltip.offsetWidth / 2) + (this.target.offsetWidth / 2)
    })
  }

  tooltipStyles () {
    return this.getPos()
  }

  render () {
    const { hovered } = this.state

    const tooltipClass = classNames('tooltip', {
      hovered
    })

    return (
      <div
        data-pos={this.props.pos}
        styleName={tooltipClass}
        style={this.tooltipStyles()}
        ref={tooltip => this.tooltip = tooltip}
      >
        {this.props.children}
      </div>
    )
  }
}

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]).isRequired
}

export default Tooltip
