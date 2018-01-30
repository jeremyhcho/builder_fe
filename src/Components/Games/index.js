import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Spinner } from 'Components/Common'
import DateInput from './DateInput'
import GamesList from './GamesList'

// CSS
import './Games.scss'

const Games = ({ games, fetchingGames }) => (
  <div>
    <Row style={{ padding: '0 65px' }}>
      <DateInput />
    </Row>
    {
      fetchingGames ? (
        <div className="loader">
          <Spinner lg show />
        </div>
      ) : (
        <GamesList games={games} />
      )
    }
  </div>
)

Games.defaultProps = {
  games: [],
  fetchingGames: false
}

Games.propTypes = {
  games: PropTypes.array,
  fetchingGames: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  games: routines.nba.games,
  fetchingGames: routines.callingApi.FETCH_NBA_GAMES
})

export default connect(
  mapStateToProps,
  null
)(Games)
