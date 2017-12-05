import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Label } from '@atlaskit/field-base'
import { DateInput } from 'Components/Common'

// CSS
import './Matches.scss'

// Matches
import { fetchNBAMatches } from 'Actions'

class Matches extends React.Component {
  state = {
    from: '',
    to: ''
  }

  getDates = (date) => {
    // Convert date to UTC @ 5:00:00 am EST
    const fromDate = new Date(`${date} 9:00:00 PM`)
    const from = moment(fromDate).subtract(1, 'day').toISOString()
    // Convert date to UTC @ 4:59:00 am EST tomorrow
    const toDate = new Date(`${date} 8:59:59 PM`)
    const to = toDate.toISOString()
    this.setState({ from, to }, () => {
      this.props.fetchNBAMatches({
        from: this.state.from,
        to: this.state.to
      })
    })
  }

  render () {
    return (
      <div styleName="main-container">
        <Label label="Pick a date" />
        <DateInput
          getDate={this.getDates}
        />
      </div>
    )
  }
}

Matches.propTypes = {
  fetchNBAMatches: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  fetchNBAMatches
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches)
