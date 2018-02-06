import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Spinner } from 'Components/Common'

// Actions
import { fetchNBATeamRoster } from 'Actions'

// Helpers
import { makeSortedRoster } from 'Helpers/Selectors'

class Roster extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeamRoster(this.props.match.params.id)
  }

  render () {
    const { roster, teamDetails } = this.props

    if (!roster.length || !Object.keys(teamDetails).length) {
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner lg show />
        </div>
      )
    }

    return (
      <div
        style={{
          marginBottom: '65px',
          width: '800px',
          maxWidth: '1300px'
        }}
      >
        <div style={{ margin: '20px 0' }}>
          <h4 className="semibold">{teamDetails.full_name} Roster</h4>
        </div>

        <Row style={{ padding: '25px 40px 0' }}>
          <Col xs={2}>
            <p className="semibold label">NO.</p>
          </Col>

          <Col xs={4}>
            <p className="semibold label">NAME</p>
          </Col>

          <Col xs={2}>
            <p className="semibold label">POS</p>
          </Col>

          <Col xs={2}>
            <p className="semibold label">HT</p>
          </Col>

          <Col xs={2}>
            <p className="semibold label">WT</p>
          </Col>
        </Row>

        {
          roster.map(player => (
            <Card key={player.id} style={{ margin: '10px' }}>
              <Row style={{ padding: '15px 30px', fontWeight: '600' }}>
                <Col xs={2}>
                  <p>{player.jersey_number || '-'}</p>
                </Col>

                <Col xs={4}>
                  <p>{player.last_name}, {player.first_name}</p>
                </Col>

                <Col xs={2}>
                  <p>{player.primary_position}</p>
                </Col>

                <Col xs={2}>
                  <p>
                    {Math.floor(player.height / 12)}-{player.height % 12}
                  </p>
                </Col>

                <Col xs={2}>
                  <p>{player.weight}</p>
                </Col>
              </Row>
            </Card>
          ))
        }
      </div>
    )
  }
}

Roster.defaultProps = {
  roster: [],
  teamDetails: {}
}

Roster.propTypes = {
  match: PropTypes.object.isRequired,
  fetchNBATeamRoster: PropTypes.func.isRequired,
  roster: PropTypes.array,
  teamDetails: PropTypes.object
}

const makeMapStateToProps = () => {
  const getRoster = makeSortedRoster()
  return ({ routines }) => ({
    roster: getRoster(routines),
    teamDetails: routines.nba.teamDetails
  })
}

const mapDispatchToProps = {
  fetchNBATeamRoster
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Roster)
