import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import groupBy from 'lodash/groupBy'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'

// CSS
import './Games.scss'

// Components
import DayWrapper from './DayWrapper'
import { Spinner } from 'Components/Common'

// Actions
import { paginateNBAGames } from 'Actions'

class GamesList extends React.Component {
  state = {
    maxScrollHeight: 0,
    disableNextPagination: false,
  }

  componentWillMount () {
    // check dates when date is selected
    const { games } = this.props

    if (games.length && moment(games[games.length - 1].date._i).isSame(moment().add(1, 'day'), 'days')) {
      this.setState({ disableNextPagination: true })
    } else {
      this.setState({ disableNextPagination: false })
    }
  }

  componentWillReceiveProps (newProps) {
    // check dates on pagination
    const { games } = newProps
    const lastGame = games[games.length - 1].date._i

    if (moment(lastGame).startOf('day').diff(moment().add(1, 'days').startOf('day'), 'days') >= 0) {
      this.setState({ disableNextPagination: true })
    } else {
      this.setState({ disableNextPagination: false })
    }
  }

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */
    if (!prevProps.games.length) {
      this.setState({ maxScrollHeight: this.scroller.scrollHeight })
      return
    }

    if (!prevProps.dates.now.isSame(this.props.dates.now)) {
      this.scroller.scrollTop = 0
      return
    }

    if (prevProps.paginatingGames && !this.props.paginatingGames) {
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

  handlePrevious = () => {
    const { games, paginateNBAGames } = this.props
    const previousDate = moment(games[0].date._i).startOf('day').format('YYYY-MM-DD')
    paginateNBAGames(previousDate, 'previous')
  }

  handleNext = () => {
    const { games, paginateNBAGames } = this.props
    const lastGame = games[games.length - 1].date._i

    if (this.state.disableNextPagination) {
      return null
    }

    const nextDate = moment(lastGame).startOf('day').format('YYYY-MM-DD')
    return paginateNBAGames(nextDate, 'next')
  }

  groupedMatches() {
    const groupedMatches = groupBy(this.props.games, (game) => game.date.tz('America/New_York').format('D MMMM'))
    // split games by date, then sort games by time of the day
    for (const date in groupedMatches) {
      if (groupedMatches[date]) {
        groupedMatches[date].sort((gameA, gameB) => (
          gameA.date.format('H.mm') - gameB.date.format('H.mm')
        ))
      }
    }

    return groupedMatches
  }

  renderPaginationPrevious () {
    if (this.props.paginatingGames) {
      return (
        <Spinner xs show style={{ margin: '0 auto 12px' }} />
      )
    }

    return (
      <button
        styleName='pagination up'
        onClick={this.handlePrevious}
      >
        <i className="fa fa-angle-up" aria-hidden="true" styleName="pagination-icon" />
        <p className='small'>Previous</p>
      </button>
    )
  }

  renderPaginationNext () {
    const { disableNextPagination } = this.state
    const paginationDown = classNames('pagination down', {
      disable: disableNextPagination
    })
    if (this.props.paginatingGames) {
      return <Spinner xs show style={{ margin: '12px auto 0' }} />
    }

    return (
      <button
        styleName={paginationDown}
        onClick={this.handleNext}
        disabled={disableNextPagination}
      >
        <p className='small'>Next</p>
        <i className="fa fa-angle-down" aria-hidden="true" styleName="pagination-icon" />
      </button>
    )
  }

  render () {
    const groupedMatches = this.groupedMatches()

    return (
      <Row style={{ position: 'relative' }}>
        <div
          style={{
            height: 'calc(100vh - 150px)',
            padding: '0 0 25px 65px',
            overflowY: 'scroll'
          }}
          styleName="matches-container"
          ref={ref => {
            this.scroller = ref
          }}
        >
          <Row style={{ width: '100%', maxWidth: '1600px', position: 'relative' }}>
            {this.renderPaginationPrevious()}

            <Col xs={12}>
              {
                Object.keys(groupedMatches).map((date) => (
                  <DayWrapper
                    games={groupedMatches[date]}
                    key={date}
                    date={date}
                  />
                ))
              }
            </Col>

            {this.renderPaginationNext()}
          </Row>
        </div>
      </Row>
    )
  }
}

GamesList.propTypes = {
  games: PropTypes.array.isRequired,
  paginateNBAGames: PropTypes.func.isRequired,
  paginatingGames: PropTypes.bool.isRequired,
  dates: PropTypes.object.isRequired
}

const mapStateToProps = ({ nba }) => ({
  paginatingGames: nba.games.paginatingGames,
  dates: nba.games.dates
})

const mapDispatchToProps = {
  paginateNBAGames
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesList)
