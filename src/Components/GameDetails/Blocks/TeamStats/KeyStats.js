import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'

// CSS
import './TeamStats.scss'

// Actions
import { fetchNBAKeyStats } from 'Actions'

// Helpers
import { colorComparator } from 'Helpers'

class KeyStats extends React.Component {
  componentDidMount () {
    const { fetchNBAKeyStats, idProp } = this.props
    fetchNBAKeyStats(idProp)
  }

  determineColors () {
    const { summary } = this.props
    const homeColor = summary.home.colors.primary.slice(1)
    const awayColor = summary.away.colors.primary.slice(1)
    const secondaryAwayColor = summary.away.colors.secondary.slice(1)

    const ratio1 = colorComparator(homeColor, awayColor)
    const ratio2 = colorComparator(homeColor, secondaryAwayColor)

    const finalAwayColor = ratio1 > ratio2 ? secondaryAwayColor : awayColor

    return ({
      awayColor: `#${finalAwayColor}`,
      homeColor: `#${homeColor}`
    })
  }

  render () {
    const { keyStats, summary } = this.props

    if (keyStats && summary) {
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
                <p className="semibold">{summary.away.name}</p>
              </div>
              <div styleName="legend-team">
                <div
                  styleName="team-color"
                  style={{ backgroundColor: colors.homeColor }}
                />
                <p className="semibold">{summary.home.name}</p>
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

KeyStats.defaultProps = {
  keyStats: {},
  summary: {}
}

KeyStats.propTypes = {
  keyStats: PropTypes.object,
  summary: PropTypes.object,
  idProp: PropTypes.string.isRequired,
  fetchNBAKeyStats: PropTypes.func.isRequired
}

const mapStateToProps = ({ nba }) => ({
  keyStats: nba.gameDetails.teamStats.keyStats,
  summary: nba.gameDetails.overview.summary
})

const mapDispatchToProps = {
  fetchNBAKeyStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyStats)
