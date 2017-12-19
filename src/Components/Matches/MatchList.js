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
  state = {
    maxScrollHeight: 0
  }

  componentWillMount() {
    document.body.style.overflow = 'hidden'
  }

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */
    if (!prevProps.matches.length) {
      this.setState({ maxScrollHeight: this.scroller.scrollHeight })
      return
    }

    if (prevProps.matches.length !== this.props.matches.length) {
      const height = this.scroller.scrollHeight
      const previousHeight = this.state.maxScrollHeight
      this.setState({
        maxScrollHeight: height
      }, () => {
        this.scroller.scrollTop = this.state.maxScrollHeight - previousHeight - 50
      })
    }

    /* eslint-enable react/no-did-update-set-state */
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

  fetchingMatches() {
    if (this.props.fetchingMatches) {
      return (
        <Col xs={12}>
          <Spinner lg show />
        </Col>
      )
    }
    return null
  }

  render () {
    const groupedMatches = this.groupedMatches()
    const { paginatingMatches, fetchingMatches } = this.props
    return (
      <Row>
        <div
          style={{ height: 'calc(100vh - 150px)', paddingBottom: '25px', overflowY: 'scroll' }}
          styleName="matches-container"
          ref={ref => {
            this.scroller = ref
          }}
        >
          {
            fetchingMatches ? (
              <Row center='xs' style={{ marginTop: 'calc(100vh * .25)' }}>
                <Col xs={12}>
                  <Spinner lg show />
                </Col>
              </Row>
            ) : (
              <Row>
                {
                  paginatingMatches ?
                    <Spinner xs show style={{ margin: '0 auto 12px' }} /> : (
                      <div styleName='pagination up' onClick={this.handlePrevious}>
                        <i className="fa fa-angle-up" aria-hidden="true" styleName="pagination-icon" />
                        <p>Previous</p>
                      </div>
                    )
                }
                <Col xs={12}>
                  {
                    Object.keys(groupedMatches).map((date) => (
                      <DayWrapper
                        matches={groupedMatches[date]}
                        key={date}
                        date={date}
                      />
                    ))
                  }
                </Col>
                {
                  paginatingMatches ?
                    <Spinner xs show style={{ margin: '12px auto 0' }} /> : (
                      <div styleName='pagination down' onClick={this.handleNext}>
                        <p>Next</p>
                        <i className="fa fa-angle-down" aria-hidden="true" styleName="pagination-icon" />
                      </div>
                    )
                }
              </Row>
            )
          }
        </div>
      </Row>
    )
  }
}

MatchList.propTypes = {
  matches: PropTypes.array.isRequired,
  paginateNBAMatches: PropTypes.func.isRequired,
  fetchingMatches: PropTypes.bool.isRequired,
  paginatingMatches: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ matches }) => ({
  fetchingMatches: matches.fetchingMatches,
  paginatingMatches: matches.paginatingMatches
})

const mapDispatchToProps = {
  paginateNBAMatches
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList)
