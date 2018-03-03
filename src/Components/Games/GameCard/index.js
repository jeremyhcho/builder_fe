import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import GameDetails from './GameDetails'
import { QuartzLink } from 'Components/Common'

// CSS
import './GameCard.scss'

class GameCard extends React.Component {
  state = {
    showBets: false
  }

  render () {
    const { game, isTrial } = this.props

    return (
      <div styleName="game-card">
        <GameDetails game={game} isTrial={isTrial} />

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
