import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Actions
import { fetchPickOfTheDays } from 'Actions'

// Components
import { Button } from 'Components/Common'

class PickOfTheDay extends React.Component {
  componentDidMount () {
    this.props.fetchPickOfTheDays()
  }

  navigateToCreate = () => {
    this.props.history.push({ pathname: '/admin/potd/new' })
  }

  render () {
    console.log(this.props.pickOfTheDays)
    return (
      <div>
        I AM THE PICK OF THE DAYS
        {this.props.pickOfTheDays}

        <Button primary onClick={this.navigateToCreate}>
          Create Pick Of The Day
        </Button>
      </div>
    )
  }
}

PickOfTheDay.defaultProps = {
  pickOfTheDays: []
}

PickOfTheDay.propTypes = {
  pickOfTheDays: PropTypes.array,
  fetchPickOfTheDays: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines }) => ({
  pickOfTheDays: routines.admin.pickOfTheDays
})

const mapDispatchToProps = {
  fetchPickOfTheDays
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PickOfTheDay))
