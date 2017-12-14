import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'

// Components
import { DateInput } from 'Components/Common'
import MatchList from './MatchList'

// CSS
import './Matches.scss'

// Matches
import { fetchNBAMatches } from 'Actions'

class Matches extends React.Component {
  getDates = (date) => {
    // Convert date to UTC @ 5:00:00 am EST
    const fromDate = new Date(`${date} 9:00:00 PM`)
    const from = moment(fromDate).subtract(1, 'day').toISOString()
    // Convert date to UTC @ 4:59:00 am EST on the next day
    const toDate = new Date(`${date} 8:59:59 PM`)
    const to = toDate.toISOString()
    // fetch NBA matches
    this.props.fetchNBAMatches({ from, to })
  }

  render () {
    return (
      <Grid fluid>
        <Row middle="xs" style={{ paddingTop: '10px' }}>
          <Col>
            <DateInput getDate={this.getDates} />
          </Col>
        </Row>
        <Row>
          <MatchList matches={this.props.matches} />
        </Row>
      </Grid>
    )
  }
}

Matches.defaultProps = {
  matches: []
}

Matches.propTypes = {
  fetchNBAMatches: PropTypes.func.isRequired,
  matches: PropTypes.array
}

const mapStateToProps = ({ matches }) => ({
  matches
})

const mapDispatchToProps = {
  fetchNBAMatches
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches)
