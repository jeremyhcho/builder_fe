import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Spinner } from 'Components/Common'

// Actions
import { fetchNBATeamAts } from 'Actions'

// CSS
import './Overview.scss'

class TeamAts extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeamAts(this.props.teamId)
  }
  //
  // getMatchType (game) {
  //   if (game.match_type === 'HOME') {
  //     return 'vs'
  //   }
  //
  //   return '@'
  // }

  render () {
    const { teamAts } = this.props

    if (!teamAts.length) {
      return (
        <Card
          label="Results ATS"
          wrapperStyle={{
            padding: '65px',
            textAlign: 'center'
          }}
        >
          <Spinner lg show />
        </Card>
      )
    }

    return (
      <Card
        label="Results ATS"
        wrapperStyle={{ padding: '25px' }}
      >
        <div styleName="team-ats-container">
          <Row center='xs' styleName='ats-row-label'>
            <Col xs={3}>
              <p className="semibold label">OPPONENT</p>
            </Col>

            <Col xs={3}>
              <p className="semibold label">VEGAS SPREAD</p>
            </Col>

            <Col xs={3}>
              <p className="semibold label">RESULT</p>
            </Col>

            <Col xs={3}>
              <p className="semibold label">ATS</p>
            </Col>
          </Row>
          <div styleName="team-ats">
            {
              teamAts.map(ats => (
                <Row
                  center='xs'
                  styleName="ats-row"
                  key={ats.actual_spread}
                >
                  <Col xs={3}>
                    <p className="semibold">
                      {ats.opposing_team.name}
                    </p>
                  </Col>

                  <Col xs={3}>
                    <p className="semibold">
                      {ats.vegas_spread}
                    </p>
                  </Col>

                  <Col xs={3}>
                    <p className="semibold">
                      {ats.actual_spread}
                    </p>
                  </Col>

                  <Col xs={3}>
                    <p className="semibold">
                      {ats.result[0].toUpperCase() + ats.result.substr(1)}
                    </p>
                  </Col>
                </Row>
              ))
            }
          </div>
        </div>
      </Card>
    )
  }
}

TeamAts.defaultProps = {
  teamAts: []
}

TeamAts.propTypes = {
  teamAts: PropTypes.array,
  teamId: PropTypes.string.isRequired,
  fetchNBATeamAts: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  teamAts: routines.nba.teamAts
})

const mapDispatchToProps = {
  fetchNBATeamAts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAts)
