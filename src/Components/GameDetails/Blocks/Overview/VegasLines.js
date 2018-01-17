import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// Actions
import { fetchNBALines } from 'Actions'

// CSS
import './Overview.scss'

class VegasLines extends React.Component {
  componentDidMount () {
    this.props.fetchNBALines(this.props.matchId)
  }

  render () {
    const { lines, summary } = this.props

    if (!lines || !summary) {
      return (
        <div>
          <OverviewSpinner label='Vegas Lines' />
        </div>
      )
    }

    if (!lines.length) {
      return 'NO VEGAS LINES'
    }

    return (
      <Card label="Vegas Lines" styleName="vegas-lines">
        <Row middle='xs' center='xs' styleName="vegas-lines-header">
          <Col xs={3}>
            <p className="label semibold">TEAM</p>
          </Col>
          <Col xs={3}>
            <p className="label semibold">MONEY LINE</p>
          </Col>
          <Col xs={3}>
            <p className="label semibold">SPREAD</p>
          </Col>
          <Col xs={3}>
            <p className="label semibold">TOTAL</p>
          </Col>
        </Row>

        <Row middle='xs' center='xs' styleName="vegas-lines-header">
          <Col xs={3} style={{ textAlign: 'left', padding: '0 30px' }}>
            <p className="label semibold">{summary.away.city}</p>
            <p className="semibold">{summary.away.name}</p>
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

        <Row middle='xs' center='xs' styleName="vegas-lines-header">
          <Col xs={3} style={{ textAlign: 'left', padding: '0 30px' }}>
            <p className="label semibold">{summary.home.city}</p>
            <p className="semibold">{summary.home.name}</p>
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

VegasLines.defaultProps = {
  lines: null,
  summary: null
}

VegasLines.propTypes = {
  fetchNBALines: PropTypes.func.isRequired,
  lines: PropTypes.array,
  matchId: PropTypes.string.isRequired,
  summary: PropTypes.object
}

const mapStateToProps = ({ nba }) => ({
  lines: nba.gameDetails.overview.lines,
  summary: nba.gameDetails.overview.summary
})

const mapDispatchToProps = {
  fetchNBALines
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VegasLines)
