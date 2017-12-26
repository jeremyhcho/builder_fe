import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import DateInput from './DateInput'
import MatchList from './MatchList'

// CSS
import './Matches.scss'

const Matches = ({ games }) => (
  <div>
    <Row style={{ padding: '0 65px' }}>
      <DateInput />
    </Row>
    <MatchList games={games} />
  </div>
)

Matches.defaultProps = {
  games: []
}

Matches.propTypes = {
  games: PropTypes.array
}

const mapStateToProps = ({ games }) => ({
  games: games.matches
})

export default connect(
  mapStateToProps,
  null
)(Matches)
