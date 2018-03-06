import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Components
import { ButtonGroup, Spinner } from 'Components/Common'
import BetType from './BetType'

// Icons
import LeftArrow from 'Assets/Icons/left-tail-arrow.svg'

// CSS
import './BetLog.scss'

// Helpers
import { getNBAMatchBet } from 'Helpers/Selectors'

class BetLog extends React.Component {
  state = {
    selectedBet: this.getInitialBet()
  }

  getInitialBet () {
    const { game } = this.props

    if (!game.away.odds) return null

    if (game.away.odds.moneyline) {
      return 'moneyline'
    }

    if (game.away.odds.spread) {
      return 'spread'
    }

    return 'total'
  }

  getMatchBetType () {
    const { selectedBet } = this.state
    const { matchBet } = this.props

    return matchBet.find(bet => bet.bet_type === selectedBet)
  }

  getBetTypes () {
    const { game } = this.props

    return [
      { label: 'Moneyline', key: 'moneyline', disabled: !game.away.odds.moneyline },
      { label: 'Spread', key: 'spread', disabled: !game.away.odds.spread },
      { label: 'Total', key: 'total', disabled: !game.away.odds.total }
    ]
  }

  render () {
    const { game, closeBets, matchBet, show } = this.props

    const betLogStyle = classNames('bet-log', {
      show: this.props.show
    })

    return (
      <div styleName={betLogStyle}>
        <header styleName="header">
          <LeftArrow
            onClick={closeBets}
            style={{ cursor: 'pointer' }}
          />

          <h4 className="semibold">Log a bet</h4>
        </header>

        <div styleName="spread-buttons">
          {
            game.away.odds &&
            <ButtonGroup
              buttons={this.getBetTypes()}
              onChange={(e, button) => this.setState({ selectedBet: button.key })}
            />
          }
        </div>

        {
          !matchBet ? (
            <div style={{ textAlign: 'center', padding: '70px 0' }}>
              <Spinner lg show />
            </div>
          ) : (
            <BetType
              game={game}
              matchBet={this.getMatchBetType()}
              betType={this.state.selectedBet}
              show={show}
            />
          )
        }
      </div>
    )
  }
}

BetLog.defaultProps = {
  matchBet: null
}

BetLog.propTypes = {
  game: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  closeBets: PropTypes.func.isRequired,
  matchBet: PropTypes.array
}

const makeMapStateToProps = () => {
  const getBet = getNBAMatchBet()
  return ({ routines }, { game }) => ({
    matchBet: getBet(routines, game.id)
  })
}

export default connect(
  makeMapStateToProps
)(BetLog)
