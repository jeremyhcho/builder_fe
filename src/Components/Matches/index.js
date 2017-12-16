import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-styled-flexboxgrid'

// Components
import DateInput from './DateInput'
import MatchList from './MatchList'

// CSS
import './Matches.scss'

const Matches = ({ matches }) => (
  <Grid fluid styleName="match-section">
    <Row>
      <DateInput />
    </Row>
    <Row>
      <MatchList matches={matches} />
    </Row>
  </Grid>
)

Matches.defaultProps = {
  matches: []
}

Matches.propTypes = {
  matches: PropTypes.array
}

const mapStateToProps = ({ matches }) => ({
  matches
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches)
