import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import { ButtonGroup, InfoBubble, Slider } from 'Components/Common'

// Icons
import RightArrow from 'Assets/Icons/right-arrow.svg'

// CSS
import './BetLog.scss'

class BetLog extends React.Component {
  state = {
    units: 0,
    selected: 'moneyline'
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { game, toggleShowBets } = this.props

    const betLogStyle = classNames('bet-log', {
      show: this.props.show
    })

    const buttonGroup = [
      { label: 'Moneyline', key: 'moneyline' },
      { label: 'Spread', key: 'spread' },
      { label: 'Total', key: 'total' }
    ]

    return (
      <div
        styleName={betLogStyle}
      >
        <header styleName="header">
          <RightArrow
            onClick={toggleShowBets}
            style={{
              transform: 'rotate(180deg)',
              cursor: 'pointer',
              marginTop: '2px'
            }}
          />

          <h4 className="semibold">Log a bet</h4>
        </header>

        <div styleName="spread-buttons">
          <ButtonGroup
            buttons={buttonGroup}
            onChange={(e, button) => this.setState({ selected: button.key })}
            defaultKey='moneyline'
          />
        </div>

        <div styleName="row units">
          <div styleName="left">
            <p className="semibold">Units</p>

            <span>
              <InfoBubble pos="bottomRight" width={300}>
                Two plus two is four minus one thats three quick mafs.
              </InfoBubble>
            </span>
          </div>

          <div styleName="right">
            <Slider
              name="units"
              value={this.state.units}
              min={0}
              max={10}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div styleName="row pick">
          <div styleName="left">
            <p className="semibold">Pick</p>

            <span>
              <InfoBubble pos="bottomRight" width={300}>
                Two plus two is four minus one thats three quick mafs.
              </InfoBubble>
            </span>
          </div>

          <div styleName="right">
            {
              ['away', 'home'].map(team => (
                <span styleName="team-cards" key={team}>
                  <img src={game[team].image} />
                  <p className="semibold">
                    {game[team].odds[this.state.selected]}
                  </p>
                </span>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}


BetLog.propTypes = {
  game: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  toggleShowBets: PropTypes.func.isRequired
}

export default BetLog
