import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// CSS
import './Games.scss'

// Components
import GameCard from './GameCard'

class GamesList extends React.Component {
  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  // groupedMatches() {
  //   const groupedMatches = groupBy(this.props.games, (game) => (
  //     game.date.tz('America/New_York').format('D dddd MMMM')
  //   ))
  //   // split games by date, then sort games by time of the day
  //   for (const date in groupedMatches) {
  //     if (groupedMatches[date]) {
  //       groupedMatches[date].sort((gameA, gameB) => (
  //         gameA.date.format('H.mm') - gameB.date.format('H.mm')
  //       ))
  //     }
  //   }
  //
  //   return groupedMatches
  // }
  getDate () {
    return this.props.games[0].date.tz('America/New_York').format('D dddd MMMM')
  }

  sortedGames () {
    return this.props.games.sort((gameA, gameB) => (
      gameA.date.format('H.mm') - gameB.date.format('H.mm')
    ))
  }

  render () {
    const { locationState } = this.props

    return (
      <div styleName="games-list">
        {
          locationState && locationState.isTrial && (
            <Redirect to={{ pathname: '/settings/subscription', state: { from: '/games' } }} />
          )
        }

        <p
          className='small'
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'right',
            padding: '0 35px 10px 0',
          }}
        >
          All times displayed in EST
        </p>

        <div
          styleName="matches-container"
          ref={ref => {
            this.scroller = ref
          }}
        >
          {
            this.sortedGames().map(game => (
              <GameCard game={game} key={game.id} />
            ))
          }
        </div>
      </div>
    )
  }
}

GamesList.defaultProps = {
  locationState: null
}

GamesList.propTypes = {
  games: PropTypes.array.isRequired,
  locationState: PropTypes.object
}

export default GamesList
