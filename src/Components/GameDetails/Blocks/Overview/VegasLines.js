import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import OverviewSpinner from './OverviewSpinner'

// Actions
import { fetchNBALines } from 'Actions'

class VegasLines extends React.Component {
  componentDidMount () {
    this.props.fetchNBALines(this.props.idProp)
  }

  render () {
    const { lines } = this.props

    if (!lines) {
      return (
        <div>
          <OverviewSpinner label='Vegas Lines' />
        </div>
      )
    }

    return (
      <div>
        VEGASLINES
      </div>
    )
  }
}

VegasLines.defaultProps = {
  lines: {}
}

VegasLines.propTypes = {
  fetchNBALines: PropTypes.func.isRequired,
  lines: PropTypes.object,
  idProp: PropTypes.string.isRequired
}

const mapStateToProps = ({ nba }) => ({
  lines: nba.gameDetails.overview.lines,
})

const mapDispatchToProps = {
  fetchNBALines
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VegasLines)
