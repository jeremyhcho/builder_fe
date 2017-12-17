import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import groupBy from 'lodash/groupBy'
import { connect } from 'react-redux'

// CSS
import './Matches.scss'

// Components
import DayWrapper from './DayWrapper'

// Actions
import { fetchNBAMatches } from 'Actions'

class MatchList extends React.Component {
  handleNext = () => {
    const domRect = this.scroller.getBoundingClientRect()
    // max scroll height of matches-container
    const maxScrollHeight = this.scroller.scrollHeight - domRect.height
    if (this.scroller.scrollTop !== maxScrollHeight) {
      this.scroller.scrollTop = maxScrollHeight
    } else {
      // change to next date
      const nextDate = this.props.now.add(1, 'days').format('YYYY-MM-DD')
      this.props.fetchNBAMatches(nextDate)
      this.scroller.scrollTop = 0
    }
  }

  handlePrevious = () => {
    if (this.scroller.scrollTop !== 0) {
      this.scroller.scrollTop = 0
    } else {
      // change to previous date
      const previousDate = this.props.now.subtract(1, 'days').format('YYYY-MM-DD')
      this.props.fetchNBAMatches(previousDate)
    }
  }

  groupedMatches() {
    return groupBy(this.props.matches, (match) => match.date.tz('America/New_York').format('D MMMM'))
  }

  render () {
    const groupedMatches = this.groupedMatches()
    return (
      <Row>
        <div styleName="pagination-icon" onClick={this.handlePrevious}>
          <i className="fa fa-angle-up" aria-hidden="true" style={{ fontSize: '16px' }} />
          <p>Previous</p>
        </div>
        <div
          styleName="matches-container"
          onScroll={this.handleScroll}
          ref={(scroller) => {
            this.scroller = scroller
          }}
        >
          <Row>
            <Col xs={12}>
              {
                Object.keys(groupedMatches).map(date => (
                  <DayWrapper matches={groupedMatches[date]} key={date} date={date} />
                ))
              }
            </Col>
          </Row>
        </div>
        <div styleName="pagination-icon" onClick={this.handleNext}>
          <i className="fa fa-angle-down" aria-hidden="true" style={{ fontSize: '16px' }} />
          <p>Next</p>
        </div>
      </Row>
    )
  }
}

MatchList.propTypes = {
  matches: PropTypes.array.isRequired,
  now: PropTypes.object.isRequired,
  fetchNBAMatches: PropTypes.func.isRequired
}

const mapStateToProps = ({ dates }) => ({
  now: dates.now
})

const mapDispatchToProps = {
  fetchNBAMatches
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList)
