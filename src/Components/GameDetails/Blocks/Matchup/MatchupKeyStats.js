import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'

// CSS
import './Matchup.scss'

// Actions
import { fetchNBAKeyStats } from 'Actions'

// Helpers
import { colorComparator } from 'Helpers'

class MatchupKeyStats extends React.Component {
  componentDidMount () {
    const { fetchNBAKeyStats, matchup } = this.props
    fetchNBAKeyStats(matchup.id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.matchup.id !== this.props.matchup.id) {
      this.props.fetchNBAKeyStats(newProps.matchup.id)
    }
  }

  determineColors () {
    const { matchup } = this.props
    const homeColor = matchup.home.colors.primary.slice(1)
    const awayColor = matchup.away.colors.primary.slice(1)
    const secondaryAwayColor = matchup.away.colors.secondary.slice(1)

    const ratio1 = colorComparator(homeColor, awayColor)
    const ratio2 = colorComparator(homeColor, secondaryAwayColor)

    const finalAwayColor = ratio1 > ratio2 ? secondaryAwayColor : awayColor

    return ({
      awayColor: `#${finalAwayColor}`,
      homeColor: `#${homeColor}`
    })
  }

  render () {
    const { keyStats, matchup } = this.props

    if (keyStats && matchup) {
      const colors = this.determineColors()

      return (
        <div styleName="key-stats">
          <Card label="Key Differences" wrapperStyle={{ padding: '25px' }}>
            <Row styleName="legend" center='xs' around='xs'>
              <div styleName="legend-team">
                <div
                  styleName="team-color"
                  style={{ backgroundColor: colors.awayColor }}
                />
                <p className="semibold">{matchup.away.name}</p>
              </div>
              <div styleName="legend-team">
                <div
                  styleName="team-color"
                  style={{ backgroundColor: colors.homeColor }}
                />
                <p className="semibold">{matchup.home.name}</p>
              </div>
            </Row>
            {
              Object.keys(keyStats).map(stat => {
                const keyStat = stat.split('_').map(string => string[0].toUpperCase() + string.substr(1)).join(' ')
                const totalValue = keyStats[stat].away + keyStats[stat].home
                const awayWidth = keyStats[stat].away === 0 ? (
                  0.01 * 90
                ) : (
                  (keyStats[stat].away / totalValue) * 90
                )

                const homeWidth = keyStats[stat].home === 0 ? (
                  0.01 * 90
                ) : (
                  (keyStats[stat].home / totalValue) * 90
                )

                return (
                  <div key={stat} styleName="team-wrapper">
                    <Row style={{ margin: '0' }}>
                      <p className="semibold">{keyStat}</p>
                    </Row>
                    <Row styleName="team-rows">
                      <div
                        styleName="stat-display"
                        style={{ backgroundColor: `${colors.awayColor}`, width: `${awayWidth}%` }}
                      />
                      <p
                        className="semibold"
                        style={{ marginLeft: '15px' }}
                      >
                        {keyStats[stat].away}
                      </p>
                    </Row>
                    <Row styleName="team-rows">
                      <div
                        styleName="stat-display"
                        style={{ backgroundColor: `${colors.homeColor}`, width: `${homeWidth}%` }}
                      />
                      <p
                        className="semibold"
                        style={{ marginLeft: '15px' }}
                      >
                        {keyStats[stat].home}
                      </p>
                    </Row>
                  </div>
                )
              })
            }
          </Card>
        </div>
      )
    }

    return (
      <div styleName="key-stats">
        <Card label="Key Differences" wrapperStyle={{ padding: '25px' }}>
          <Row styleName="legend" center='xs' between='xs'>
            <div styleName="legend-team">
              <div
                styleName="team-color"
                style={{ backgroundColor: 'var(--light-gray)' }}
              />
              <p className="bold">Away</p>
            </div>
            <div styleName="legend-team">
              <div
                styleName="team-color"
                style={{ backgroundColor: 'var(--light-gray)' }}
              />
              <p className="bold">Home</p>
            </div>
          </Row>
        </Card>
      </div>
    )
  }
}

MatchupKeyStats.defaultProps = {
  keyStats: {},
  matchup: {}
}

MatchupKeyStats.propTypes = {
  keyStats: PropTypes.object,
  matchup: PropTypes.object,
  fetchNBAKeyStats: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  keyStats: routines.nba.keyStats,
  matchup: routines.nba.matchup
})

const mapDispatchToProps = {
  fetchNBAKeyStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchupKeyStats)
