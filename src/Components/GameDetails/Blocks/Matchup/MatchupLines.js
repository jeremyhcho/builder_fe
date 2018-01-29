import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'
import { OverviewSpinner } from 'Components/GameDetails/Blocks'

// Actions
import { fetchNBALines } from 'Actions'

// CSS
import './Matchup.scss'

class MatchupLines extends React.Component {
  componentDidMount () {
    this.props.fetchNBALines(this.props.matchup.id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.matchup.id !== this.props.matchup.id) {
      this.props.fetchNBALines(newProps.matchup.id)
    }
  }

  render () {
    const { lines, matchup } = this.props

    if (!lines || !matchup) {
      return (
        <div>
          <OverviewSpinner label='Vegas Lines' />
        </div>
      )
    }

    if (!lines.length) {
      return (
        <Card label="Vegas Lines" wrapperStyle={{ padding: '50px 25px', textAlign: 'center' }}>
          <h4 className="label semibold">
            Vegas lines is currently not available for this game
          </h4>
        </Card>
      )
    }

    return (
      <Card label="Vegas Lines" styleName="vegas-lines">
        <Row middle='xs' center='xs' styleName="vegas-lines-section">
          <Col xs={3}>
            <p className="label small semibold">TEAM</p>
          </Col>
          <Col xs={3}>
            <p className="label small semibold">MONEY LINE</p>
          </Col>
          <Col xs={3}>
            <p className="label small semibold">SPREAD</p>
          </Col>
          <Col xs={3}>
            <p className="label small semibold">TOTAL</p>
          </Col>
        </Row>

        <Row middle='xs' center='xs' styleName="vegas-lines-section">
          <Col xs={3}>
            <Row start='xs'>
              <Col xsOffset={3}>
                <p className="label semibold">{matchup.away.city}</p>
                <p className="semibold">{matchup.away.name}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <p className="semibold">{lines[0].moneyline}</p>
          </Col>
          <Col xs={3}>
            <p className="semibold">{lines[0].spread} ({lines[0].spread_odds})</p>
          </Col>
          <Col xs={3}>
            <p className="semibold">{lines[0].total} ({lines[0].total_odds})</p>
          </Col>
        </Row>

        <Row middle='xs' center='xs' styleName="vegas-lines-section">
          <Col xs={3}>
            <Row start='xs'>
              <Col xsOffset={3}>
                <p className="label semibold">{matchup.home.city}</p>
                <p className="semibold">{matchup.home.name}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <p className="semibold">{lines[1].moneyline}</p>
          </Col>
          <Col xs={3}>
            <p className="semibold">{lines[1].spread} ({lines[1].spread_odds})</p>
          </Col>
          <Col xs={3}>
            <p className="semibold">{lines[1].total} ({lines[1].total_odds})</p>
          </Col>
        </Row>
      </Card>
    )
  }
}

MatchupLines.defaultProps = {
  lines: null,
  matchup: null
}

MatchupLines.propTypes = {
  fetchNBALines: PropTypes.func.isRequired,
  lines: PropTypes.array,
  matchup: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  lines: routines.nba.lines,
  matchup: routines.nba.matchup
})

const mapDispatchToProps = {
  fetchNBALines
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchupLines)
