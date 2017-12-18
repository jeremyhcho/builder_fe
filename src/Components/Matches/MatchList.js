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
  componentWillMount() {
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  handleNext = () => {
    // const domRect = this.scroller.getBoundingClientRect()
    // // max scroll height of matches-container
    // const maxScrollHeight = this.scroller.scrollHeight - domRect.height
    const nextDate = this.props.now.add(3, 'days').format('YYYY-MM-DD')
    this.props.fetchNBAMatches(nextDate)
    this.scroller.scrollTop = 0
  }

  handlePrevious = () => {
    // change to previous date
    const previousDate = this.props.now.subtract(1, 'days').format('YYYY-MM-DD')
    this.props.fetchNBAMatches(previousDate)
  }

  groupedMatches() {
    return groupBy(this.props.matches, (match) => match.date.tz('America/New_York').format('D MMMM'))
  }

  render () {
    const groupedMatches = this.groupedMatches()
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
              <i className="fa fa-angle-up" aria-hidden="true" style={{ fontSize: '16px' }} />
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
              <i className="fa fa-angle-down" aria-hidden="true" style={{ fontSize: '16px' }} />
            </div>
          </Row>
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
