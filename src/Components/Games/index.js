import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import DateInput from './DateInput'
import GamesList from './GamesList'

// CSS
import './Games.scss'

const Games = ({ games }) => (
  <div>
    <Row style={{ padding: '0 65px' }}>
      <DateInput />
    </Row>
    <GamesList games={games} />
  </div>
)

Games.defaultProps = {
  games: []
}

Games.propTypes = {
  games: PropTypes.array
}

const mapStateToProps = ({ nba }) => ({
  games: nba.games.gamesList
})

export default connect(
  mapStateToProps,
  null
)(Games)
