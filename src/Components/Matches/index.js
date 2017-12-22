import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import DateInput from './DateInput'
import MatchList from './MatchList'

// CSS
import './Matches.scss'

const Matches = ({ nbaGames }) => (
  <div>
    <Row style={{ padding: '0 65px' }}>
      <DateInput />
    </Row>
    <MatchList matches={nbaGames} />
  </div>
)

Matches.defaultProps = {
  nbaGames: []
}

Matches.propTypes = {
  nbaGames: PropTypes.array
}

const mapStateToProps = ({ nbaGames }) => ({
  nbaGames: nbaGames.matches
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches)
