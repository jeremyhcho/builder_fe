import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

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
    return this.props.fetchNBAGames(this.props.dates.selectedDate)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.dates.selectedDate !== this.props.dates.selectedDate) {
      this.props.fetchNBAGames(newProps.dates.selectedDate)
      this.props.history.push({ pathname: '/games', search: `date=${newProps.dates.selectedDate}` })
    }
  }

  render () {
    const { games, fetchingGames, location: { state: locationState } } = this.props

    return (
      <DocumentTitle title='Quze - NBA Schedule' header='Games'>
        <div>
          <Row style={{ padding: '0 65px', margin: '0' }}>
            <DateInput />
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
  location: PropTypes.object.isRequired,
  dates: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines, nba }) => ({
  games: routines.nba.games,
  dates: nba.dates,
  fetchingGames: routines.isLoading.FETCH_NBA_GAMES
})

const mapDispatchToProps = {
  fetchNBAGames
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games)
