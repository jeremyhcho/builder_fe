import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'

// Components
import {
  Card,
  // ButtonGroup,
  // Button,
  // Spinner
} from 'Components/Common'

// CSS
import './Trends.scss'

// Actions
import { fetchNBAPredictability } from 'Actions'

class Predictability extends React.Component {
  componentDidMount () {
    this.props.fetchNBAPredictability(this.props.summary.id)
  }

  dataFactory () {
    const labels = [1, 2]
    const datasets = [{
      label: 'Model Predictions',
      data: [5, 10]
    }]

    return { labels, datasets }
  }

  render () {
    const { predictability, fetchingPredictability } = this.props

    if (fetchingPredictability || !Object.keys(predictability).length) {
      return <div />
    }

    return (
      <Card
        label="Predictability"
        styleName="predictability"
        wrapperStyle={{
          padding: '25px'
        }}
      >
        <Line
          data={this.dataFactory()}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: { display: false }
              }],
              xAxes: [{
                ticks: { display: false }
              }]
            }
          }}
        />
      </Card>
    )
  }
}

Predictability.defaultProps = {
  summary: {},
  predictability: {},
  fetchingPredictability: false,
}

Predictability.propTypes = {
  summary: PropTypes.object,
  predictability: PropTypes.object,
  fetchingPredictability: PropTypes.bool,
  fetchNBAPredictability: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary,
  fetchingPredictability: routines.callingApi.getNBAPredictability,
  predictability: routines.nba.predictability
})

const mapDispatchToProps = {
  fetchNBAPredictability
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Predictability)
