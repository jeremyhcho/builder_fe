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

class KeyStats extends React.Component {
  componentDidMount () {
    const { fetchNBAKeyStats, idProp } = this.props
    fetchNBAKeyStats(idProp)
  }

  render () {
    const { keyStats, summary } = this.props
    if (keyStats && summary) {
      return (
        <div styleName="key-stats">
          <Card label="Key Differences" wrapperStyle={{ padding: '25px' }}>
            <Row styleName="legend" center='xs' between='xs'>
              <div styleName="legend-team">
                <div
                  styleName="team-color"
                  style={{ border: `4px solid ${summary.away.colors.primary}` }}
                />
                <p className="bold">{summary.away.name}</p>
              </div>
              <div styleName="legend-team">
                <div
                  styleName="team-color"
                  style={{ border: `4px solid ${summary.home.colors.primary}` }}
                />
                <p className="bold">{summary.home.name}</p>
              </div>
            </Row>
            {
              Object.keys(keyStats).map(stat => {
                const keyStat = stat.split('_').map(string => string[0].toUpperCase() + string.substr(1)).join(' ')
                const totalValue = keyStats[stat].away + keyStats[stat].home
                const awayWidth = (keyStats[stat].away / totalValue) * 100
                const homeWidth = (keyStats[stat].home / totalValue) * 100
                return (
                  <div key={stat} styleName="team-wrapper">
                    <Row style={{ margin: '0' }}>
                      <p className="semibold">{keyStat}</p>
                    </Row>
                    <Row styleName="team-rows">
                      <div
                        styleName="stat-display"
                        style={{ backgroundColor: `${summary.away.colors.primary}`, width: `${awayWidth}%` }}
                      />
                      <p
                        className="semibold label"
                        style={{ marginLeft: '15px' }}
                      >
                        {keyStats[stat].away}
                      </p>
                    </Row>
                    <Row styleName="team-rows">
                      <div
                        styleName="stat-display"
                        style={{ backgroundColor: `${summary.home.colors.primary}`, width: `${homeWidth}%` }}
                      />
                      <p
                        className="semibold label"
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
