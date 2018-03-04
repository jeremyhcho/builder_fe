import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import GameDetails from './GameDetails'
import BetLog from './BetLog'
import { QuartzLink } from 'Components/Common'

// CSS
import './GameCard.scss'

class GameCard extends React.Component {
  state = {
    showBets: true,
    cardHeight: 0
  }

  toggleShowBets = () => {
    this.setState({ showBets: !this.state.showBets })
  }

  render () {
    const { game, isTrial } = this.props

    return (
      <div styleName="game-card">
        <GameDetails
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

        <QuartzLink to={{ pathname: `/games/${game.id}` }}>
          <div styleName="cta-row">
            <p className="semibold">View Details</p>
          </div>
        </QuartzLink>
      </div>
    )
  }
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  isTrial: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  isTrial: auth.authState.user.trial
})

export default connect(
  mapStateToProps
)(GameCard)
