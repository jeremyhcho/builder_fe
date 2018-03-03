import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
// import { ButtonGroup } from 'Components/Common'

// Icons
import RightArrow from 'Assets/Icons/right-arrow.svg'

// CSS
import './BetLog.scss'

class BetLog extends React.Component {
  render () {
    const betLogStyle = classNames('bet-log', {
      show: this.props.show
    })

    return (
      <div
        style={{ height: `${this.props.cardHeight}px` }}
        styleName={betLogStyle}
      >
        <header styleName="header">
          <span>
            <RightArrow
              onClick={this.props.toggleShowBets}
              style={{
                transform: 'rotate(180deg)'
              }}
            />
          </span>

          <h4>Log a bet</h4>
        </header>

        <div styleName="units">
          <p>Units</p>
        </div>

        <div styleName="pick">
          <p>Pick</p>
        </div>
      </div>
    )
  }
}

BetLog.defaultProps = {
  cardHeight: null
}

BetLog.propTypes = {
  cardHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  show: PropTypes.bool.isRequired,
  toggleShowBets: PropTypes.func.isRequired
}

export default BetLog
