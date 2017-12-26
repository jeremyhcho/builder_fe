import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Card } from 'Components/Common'

// CSS
import './PlayerStats.scss'

class TeamPlayers extends React.Component {
  render () {
    const { teamName, players } = this.props
    console.log(players)
    const starterPlayers = players.filter(player => player.starter)
    const benchPlayers = players.filter(player => !player.starter)
    return (
      <Card label={teamName} wrapperStyle={{ padding: '40px' }} styleName="player-stats">
        <div className="flex">
          <div styleName="players-container">
            <div>
              <p className="bold label" style={{ margin: '15px 0' }}>Starters</p>
              {
                starterPlayers.map(player => (
                  <div key={player.id}>
                    <p
                      data-tip-for={`player-${player.id}`}
                      className="semibold"
                      styleName="players-value name"
                    >
                      {player.last_name}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>

          <div styleName="players-container stats">
            {
              Object.keys(starterPlayers[0].statistics).map(stat => (
                <div key={stat} style={{ textAlign: 'center' }}>
                  <p className="semibold label" styleName="players-label">{stat.slice(0, 3).toUpperCase()}</p>
                  {
                    starterPlayers.map(player => (
                      <p
                        styleName="players-value"
                        key={player.id}
                      >
                        {player.statistics[stat]}
                      </p>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>

        <div className="flex">
          <div styleName="players-container">
            <div>
              <p className="bold label" style={{ margin: '15px 0' }}>Bench</p>
              {
                benchPlayers.map(player => (
                  <div key={player.id}>
                    <p
                      data-tip-for={`player-${player.id}`}
                      className="semibold"
                      styleName="players-value name"
                    >
                      {player.last_name}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>

          <div styleName="players-container stats">
            {
              Object.keys(benchPlayers[0].statistics).map(stat => (
                <div key={stat} style={{ textAlign: 'center' }}>
                  <p className="semibold label" styleName="players-label">{stat.slice(0, 3).toUpperCase()}</p>
                  {
                    benchPlayers.map(player => (
                      <p
                        styleName="players-value"
                        key={player.id}
                      >
                        {player.statistics[stat]}
                      </p>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </Card>
    )
  }
}

TeamPlayers.propTypes = {
  teamName: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
}

export default TeamPlayers
