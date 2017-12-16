import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import groupBy from 'lodash/groupBy'

// CSS
import './Matches.scss'

// Components
import DayWrapper from './DayWrapper'
// import Match from './Match'

class MatchList extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden'
    // setTimeout(this.autoScroll, 1000)
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  // autoScroll = () => {
  //   this.scroller.scrollTop += 1856
  // }

  // handleScroll = () => {
  //   if (this.scroller && this.scroller.scrollTop) {
  //     const domRect = this.scroller.getBoundingClientRect()
  //     const maxScrollHeight = this.scroller.scrollHeight - domRect.height
  //   }
  // }

  groupedMatches() {
    return groupBy(this.props.matches, (match) => match.date.tz('America/New_York').format('D MMMM'))
  }

  render () {
    const groupedMatches = this.groupedMatches()
    return (
      <div
        styleName="matches-container"
        // onScroll={this.handleScroll}
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
    )
  }
}

MatchList.propTypes = {
  matches: PropTypes.array.isRequired
}

export default MatchList
