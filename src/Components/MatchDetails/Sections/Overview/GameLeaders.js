import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, ButtonGroup, Spinner } from 'Components/Common'

class GameLeaders extends React.Component {
  state = {
    selected: 'points'
  }

  leaderStats(teamString, key) {
    const { summary } = this.props
    const { selected } = this.state
    let team
    if (teamString === 'away') {
      team = summary.away_team
    } else {
      team = summary.home_team
    }

    if (selected === 'points') {
      return key === 'name' ?
        team.leaders.points.name : team.leaders.points.value
    } else if (selected === 'assists') {
      return key === 'name' ?
        team.leaders.assists.name : team.leaders.assists.value
    }
    return key === 'name' ?
      team.leaders.rebounds.name : team.leaders.rebounds.value
  }

  render () {
    const { summary } = this.props
    const buttons = [
      { label: 'Points', key: 'points' },
      { label: 'Assists', key: 'assists' },
      { label: 'Rebounds', key: 'rebounds' }
    ]
    return (
      <div>
        {
          summary ? (
            <Card label="Game Leaders" wrapperStyle={{ padding: '25px' }}>
              <Row middle='xs'>
                <ButtonGroup
                  buttons={buttons}
                  onChange={(button) => this.setState({ selected: button.key })}
                  defaultKey="points"
                />
              </Row>

              <Row>
                <Col xs={5} xsOffset={1}>
                  <Card label={summary.away_team.name}>
                    <Row>
                      <Col xs={8}>
                        <p>position</p>
                        <h1>
                          {this.leaderStats('away', 'name')}
                        </h1>
                      </Col>
                      <Col xs={4}>
                        <h1>
                          {this.leaderStats('away', 'value')}
                        </h1>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col xs={5}>
                  <Card label={summary.home_team.name}>
                    <Row>
                      <Col xs={8}>
                        <p>position</p>
                        <h1>
                          {this.leaderStats('home', 'name')}
                        </h1>
                      </Col>
                      <Col xs={4}>
                        <h1>
                          {this.leaderStats('home', 'value')}
                        </h1>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          ) : (
            <Card label="Game Leaders" wrapperStyle={{ padding: '50px 25px' }}>
              <Row center='xs' middle='xs'>
                <Col xs={12}>
                  <Spinner lg show />
                </Col>
              </Row>
            </Card>
          )
        }
      </div>
    )
  }
}

GameLeaders.defaultProps = {
  summary: {}
}

GameLeaders.propTypes = {
  summary: PropTypes.object
}

const mapStateToProps = ({ matchDetails }) => ({
  summary: matchDetails.overview.summary
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLeaders)
