import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// Icons
import BanIcon from 'Assets/Icons/ban.svg'

// Actions
import { fetchNBALines } from 'Actions'

// CSS
import './Overview.scss'

class VegasLines extends React.Component {
  componentDidMount () {
    this.props.fetchNBALines(this.props.matchId)
  }

  renderSpread (line) {
    if (line.spread) {
      return `${line.spread} (${line.spread_odds})`
    }

    return 'N/A'
  }

  renderTotals (line) {
    if (line.total) {
      return `${line.total} (${line.total_odds})`
    }

    return 'N/A'
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
      return (
        <Card label="Vegas Lines" wrapperStyle={{ padding: '50px 25px', textAlign: 'center' }}>
          <div style={{ textAlign: 'center', lineHeight: '30px' }}>
            <BanIcon />
            <h4 className="semibold label">
              Vegas lines are currently not available for this game
            </h4>
          </div>
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
                <p className="label semibold">{summary.away.city}</p>
                <p className="semibold">{summary.away.name}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <p className="semibold">{lines[0].moneyline || 'N/A'}</p>
          </Col>
          <Col xs={3}>
            <p className="semibold">
              {this.renderSpread(lines[0])}
            </p>
          </Col>
          <Col xs={3}>
            <p className="semibold">
              {this.renderTotals(lines[0])}
            </p>
          </Col>
        </Row>

        <Row middle='xs' center='xs' styleName="vegas-lines-section">
          <Col xs={3}>
            <Row start='xs'>
              <Col xsOffset={3}>
                <p className="label semibold">{summary.home.city}</p>
                <p className="semibold">{summary.home.name}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <p className="semibold">{lines[1].moneyline || 'N/A'}</p>
          </Col>
          <Col xs={3}>
            <p className="semibold">{this.renderSpread(lines[1])}</p>
          </Col>
          <Col xs={3}>
            <p className="semibold">{this.renderTotals(lines[1])}</p>
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

const mapStateToProps = ({ routines }) => ({
  lines: routines.nba.lines,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBALines
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VegasLines)
