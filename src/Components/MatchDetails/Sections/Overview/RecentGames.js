import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import uniqueId from 'lodash/uniqueid'

// Components
import { Card, ButtonGroup, Button } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// CSS
import './Overview.scss'

// Actions
import { fetchNBARecentGames } from 'Actions'

class RecentGames extends React.Component {
  state = {
    selected: 'away'
  }

  componentDidMount() {
    const { fetchNBARecentGames, idProp } = this.props
    fetchNBARecentGames(idProp)
  }

  render () {
    const { recentGames, summary } = this.props
    const { selected } = this.state
    if (recentGames && summary) {
      const buttons = [
        { label: summary.away.name, key: 'away' },
        { label: summary.home.name, key: 'home' },
      ]
      return (
        <div>
          <Card label="Recent Games" wrapperStyle={{ padding: '25px' }} styleName="recent-games">
            <Row between='xs' middle='xs' center='xs' styleName="recent-games-header">
              <Col xs={6}>
                <h1>Streak W2</h1>
              </Col>

              <Col xs={6}>
                <ButtonGroup
                  buttons={buttons}
                  onChange={(e, button) => this.setState({ selected: button.key })}
                  defaultKey={buttons[0].key}
                />
              </Col>
            </Row>

            {
              recentGames[selected].map(stats => (
                <Row
                  key={uniqueId('recent_games_match_')}
                  center='xs'
                  middle='xs'
                  styleName="recent-games-match"
                  between='xs'
                >
                  {stats.outcome === 'loss' ? (
                    <Button danger>L</Button>
                  ) : (
                    <Button success>W</Button>
                  )}
                  {
                    stats.match_type === selected ? (
                      <p>@</p>
                    ) : (
                      <p>vs</p>
                    )
                  }
                  <p>{stats.opposing_team} ({stats.score[selected]}-{stats.score.home})</p>
                </Row>
              ))
            }
          </Card>
        </div>
      )
    }
    return (
      <div>
        <OverviewSpinner label="Recent Games" />
      </div>
    )
  }
}

RecentGames.defaultProps = {
  recentGames: {},
  summary: {}
}

RecentGames.propTypes = {
  idProp: PropTypes.string.isRequired,
  fetchNBARecentGames: PropTypes.func.isRequired,
  recentGames: PropTypes.object,
  summary: PropTypes.object
}

const mapStateToProps = ({ matchDetails }) => ({
  summary: matchDetails.overview.summary,
  recentGames: matchDetails.overview.recentGames
})

const mapDispatchToProps = {
  fetchNBARecentGames
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentGames)
