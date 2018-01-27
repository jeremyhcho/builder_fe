import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Card } from 'Components/Common'

// CSS
import './PlayerStats.scss'

// Helpers
import { nbaFlatStat, precisionRound } from 'Helpers'

const tenths = precisionRound(1)

const TeamPlayers = ({ teamName, players }) => {
  const starterPlayers = players.filter(player => player.starter)
  const benchPlayers = players.filter(player => !player.starter)

  return (
    <Card label={teamName} wrapperStyle={{ padding: '40px' }} styleName="player-stats">
      <div className="flex">
        <div styleName="players-container">
          <div>
            <p className="semibold label" style={{ margin: '15px 0' }}>Starters</p>
            {
              starterPlayers.map(player => (
                <div key={player.id}>
                  <p
                    className="semibold"
                    styleName="players-value"
                  >
                    {player.first_name.slice(0, 1)}. {player.last_name}
                  </p>
                </div>
              ))
            }
          </div>
        </div>

        <div styleName="players-container stats">
          {
            Object.keys(starterPlayers[0].statistics).map(stat => {
              if (!nbaFlatStat(stat)) return null

              return (
                <div key={stat} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <p className="semibold label" styleName="players-label">
                    {nbaFlatStat(stat)}
                  </p>
                  {
                    starterPlayers.map(player => (
                      <p
                        styleName="players-value"
                        key={player.id}
                      >
                        {tenths(player.statistics[stat])}
                      </p>
                    ))
                  }
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="flex">
        <div styleName="players-container">
          <div>
            <p className="semibold label" style={{ margin: '15px 0' }}>Bench</p>
            {
              benchPlayers.map(player => (
                <div key={player.id}>
                  <p
                    className="semibold"
                    styleName="players-value"
                  >
                    {player.first_name.slice(0, 1)}. {player.last_name}
                  </p>
                </div>
              ))
            }
          </div>
        </div>

        <div styleName="players-container stats">
          {
            Object.keys(benchPlayers[0].statistics).map(stat => {
              if (!nbaFlatStat(stat)) return null

              return (
                <div key={stat} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <p className="semibold label" styleName="players-label">
                    {nbaFlatStat(stat)}
                  </p>
                  {
                    benchPlayers.map(player => (
                      <p
                        styleName="players-value"
                        key={player.id}
                      >
                        {tenths(player.statistics[stat])}
                      </p>
                    ))
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </Card>
  )
}

TeamPlayers.propTypes = {
  teamName: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
}

export default TeamPlayers
