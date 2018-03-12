import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import GameStats from './GameStats'
import BetLog from './BetLog'
import { QuzeLink } from 'Components/Common'

// CSS
import './GameCard.scss'

// Actions
import { fetchNBAMatchBet } from 'Actions'

// Helpers
import { getNBAMatchBet } from 'Helpers/Selectors'

class GameCard extends React.Component {
  state = {
    showBets: false
  }

  openBets = () => {
    this.setState({
      showBets: true
    }, () => {
      if (!this.props.matchBet) {
        this.props.fetchNBAMatchBet(this.props.game.id)
      }
    })
  }

  closeBets = () => {
    this.setState({ showBets: false })
  }

  render () {
    const { game, isTrial } = this.props

    return (
      <div styleName="game-card">
        <GameStats
          game={game}
          isTrial={isTrial}
          showBets={this.state.showBets}
          openBets={this.openBets}
        />

        <BetLog
          game={game}
          closeBets={this.closeBets}
          show={this.state.showBets}
        />

        <hr />

        <QuzeLink to={{ pathname: `/games/${game.id}` }}>
          <div styleName="cta-row">
            <p className="semibold">View Details</p>
          </div>
        </QuzeLink>
      </div>
    )
  }
}

GameCard.defaultProps = {
  matchBet: null
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  isTrial: PropTypes.bool.isRequired,
  fetchNBAMatchBet: PropTypes.func.isRequired,
  matchBet: PropTypes.array
}

const makeMapStateToProps = () => {
  const getBet = getNBAMatchBet()
  return ({ routines, auth }, { game }) => ({
    matchBet: getBet(routines, game.id),
    isTrial: auth.authState.user.trial
  })
}

const mapDispatchToProps = {
  fetchNBAMatchBet
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(GameCard)
