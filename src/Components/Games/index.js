import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Spinner, DocumentTitle } from 'Components/Common'
import DateInput from './DateInput'
import GamesList from './GamesList'

// CSS
import './Games.scss'

const Games = ({ games, fetchingGames, location: { state: locationState } }) => (
  <DocumentTitle title='Quartz - NBA Schedule' header='Games'>
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
          <GamesList games={games} locationState={locationState} />
        )
      }
    </div>
  </DocumentTitle>
)

Games.defaultProps = {
  games: [],
  fetchingGames: false
}

Games.propTypes = {
  games: PropTypes.array,
  fetchingGames: PropTypes.bool,
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines }) => ({
  games: routines.nba.games,
  fetchingGames: routines.isLoading.FETCH_NBA_GAMES
})

export default connect(
  mapStateToProps
)(Games)
