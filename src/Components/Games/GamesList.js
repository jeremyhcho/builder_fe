import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './Games.scss'

// Components
import GameCard from './GameCard'

class GamesList extends React.Component {
  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  sortedGames () {
    return this.props.games.sort((gameA, gameB) => (
      gameA.date.diff(gameB.date)
    ))
  }

  render () {
    const secretDivs = []
    for (let i = this.props.games.length % 3; i < 3 || i === 0; i++) {
      secretDivs.push(<div styleName="game-container" key={this.props.games.length + i} />)
    }

    return (
      <div styleName="games-list">
        <div styleName='timezone'>
          <p className='small'>
            All times displayed in EST
          </p>
        </div>


        <div
          styleName="matches-container"
          ref={ref => {
            this.scroller = ref
          }}
        >
          <div styleName='matches-sub-container'>
            {
              this.sortedGames().map(game => (
                <div styleName="game-container" key={game.id}>
                  <GameCard game={game} />
                </div>
              ))
            }

            {secretDivs}
          </div>
        </div>
      </div>
    )
  }
}

GamesList.propTypes = {
  games: PropTypes.array.isRequired
}

export default GamesList
