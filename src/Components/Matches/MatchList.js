import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import groupBy from 'lodash/groupBy'
import { connect } from 'react-redux'
import moment from 'moment'

// CSS
import './Matches.scss'

// Components
import DayWrapper from './DayWrapper'
import { Spinner } from 'Components/Common'

// Actions
import { paginateNBAMatches } from 'Actions'

class MatchList extends React.Component {
  componentWillMount() {
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  handleNext = () => {
    const { matches } = this.props
    const nextDate = moment(matches[matches.length - 1].date._i).startOf('day').format('YYYY-MM-DD')
    this.props.paginateNBAMatches(nextDate, 'next')
  }

  handlePrevious = () => {
    const { matches } = this.props
    const previousDate = moment(matches[0].date._i).startOf('day').format('YYYY-MM-DD')
    this.props.paginateNBAMatches(previousDate, 'previous')
  }

  groupedMatches() {
    return groupBy(this.props.matches, (match) => match.date.tz('America/New_York').format('D MMMM'))
  }

  render () {
    const groupedMatches = this.groupedMatches()
    if (this.props.fetchingMatches) {
      return (
        <Row center='xs' bottom='xs'>
          <Col xs={12}>
            <Spinner lg show />
          </Col>
        </Row>
      )
    }
    return (
      <Row>
        <div
          style={{ overflowY: 'scroll', height: '75vh' }}
          styleName="matches-container"
          ref={(scroller) => {
            this.scroller = scroller
          }}
        >
          <Row>
            <div styleName='pagination up' onClick={this.handlePrevious}>
              <i className="fa fa-angle-up" aria-hidden="true" styleName="pagination-icon" />
              <p>Previous</p>
            </div>
            <Col xs={12}>
              {
                Object.keys(groupedMatches).map(date => (
                  <DayWrapper matches={groupedMatches[date]} key={date} date={date} />
                ))
              }
            </Col>
            <div styleName='pagination down' onClick={this.handleNext}>
              <p>Next</p>
              <i className="fa fa-angle-down" aria-hidden="true" styleName="pagination-icon" />
            </div>
          </Row>
        </div>
      </Row>
    )
  }
}

MatchList.propTypes = {
  matches: PropTypes.array.isRequired,
  paginateNBAMatches: PropTypes.func.isRequired,
  fetchingMatches: PropTypes.bool.isRequired
}

const mapStateToProps = ({ matches }) => ({
  fetchingMatches: matches.fetchingMatches
})

const mapDispatchToProps = {
  paginateNBAMatches
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList)
