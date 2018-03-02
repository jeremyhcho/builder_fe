import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'
import moment from 'moment'

// Components
import { DocumentTitle } from 'Components/Common'
import DelayedLoader from 'Layouts/Loading/DelayedLoader'
import DateInput from './DateInput'
import GamesList from './GamesList'

// CSS
import './Games.scss'

// Actions
import { fetchNBAGames } from 'Actions'

class Games extends React.Component {
  componentDidMount () {
    if (this.props.location.search) {
      this.props.fetchNBAGames(this.getFromAndTo(
        this.props.location.search.slice(6)
      ))
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.location.search !== this.props.location.search) {
      this.props.fetchNBAGames(this.getFromAndTo(
        newProps.location.search.slice(6)
      ))
    }
  }

  getFromAndTo (date) {
    const now = moment(date)
    // beginning of current date in EST
    const from = moment(`${date} 21:00:00`).subtract(1, 'day')
    // end of specified date
    const to = moment(`${date} 20:59:59`)

    return { now, from, to }
  }

  render () {
    const { games, fetchingGames, location: { state: locationState } } = this.props

    return (
      <DocumentTitle title='Quartz - NBA Schedule' header='Games'>
        <div>
          <Row style={{ padding: '0 65px' }}>
            <DateInput parseDate={this.getFromAndTo} />
          </Row>
          {
            fetchingGames ? (
              <DelayedLoader />
            ) : (
              <GamesList games={games} locationState={locationState} />
            )
          }
        </div>
      </DocumentTitle>
    )
  }
}

Games.defaultProps = {
  games: [],
  fetchingGames: false
}

Games.propTypes = {
  games: PropTypes.array,
  fetchingGames: PropTypes.bool,
  fetchNBAGames: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines }) => ({
  games: routines.nba.games,
  fetchingGames: routines.isLoading.FETCH_NBA_GAMES
})

const mapDispatchToProps = {
  fetchNBAGames
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games)
