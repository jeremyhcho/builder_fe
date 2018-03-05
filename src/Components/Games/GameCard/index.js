import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import GameStats from './GameStats'
import BetLog from './BetLog'
import { QuartzLink } from 'Components/Common'

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

  componentWillReceiveProps (newProps) {
    if (newProps.matchBet && !this.props.matchBet) {
      this.setState({ showBets: !this.state.showBets })
    }
  }

  toggleShowBets = () => {
    if (this.props.matchBet) {
      return this.setState({ showBets: !this.state.showBets })
    }

    return this.props.fetchNBAMatchBet(this.props.game.id)
  }

  render () {
    const { game, isTrial } = this.props

    return (
      <div styleName="game-card">
        <GameStats
          game={game}
          isTrial={isTrial}
          showBets={this.state.showBets}
          toggleShowBets={this.toggleShowBets}
        />

        <BetLog
          game={game}
          toggleShowBets={this.toggleShowBets}
          show={this.state.showBets}
        />

        <hr />

        <QuartzLink to={{ pathname: `/games/${game.id}` }}>
          <div styleName="cta-row">
            <p className="semibold">View Details</p>
          </div>
        </QuartzLink>
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
