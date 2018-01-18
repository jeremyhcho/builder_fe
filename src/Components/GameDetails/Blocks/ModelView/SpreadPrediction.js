import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'

// Components
import { Card, ButtonGroup } from 'Components/Common'

// CSS
import './ModelView.scss'

class SpreadPrediction extends React.Component {
  dataFactory () {
    const labels = [1, 2]
    const datasets = [{
      label: 'Model Predictions',
      data: [5, 10]
    }]

    return { labels, datasets }
  }

  render () {
    const { summary } = this.props

    const buttons = [
      { label: summary.away.name, key: 'away' },
      { label: summary.home.name, key: 'home' }
    ]

    return (
      <Card label="Prediction Distribution (Spread)" styleName="spread-prediction">
        <div>
          <ButtonGroup
            buttons={buttons}
            onChange={(e, button) => this.setState({ selected: button.key })}
            defaultKey="away"
          />
        </div>
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

SpreadPrediction.defaultProps = {
  summary: {}
}

SpreadPrediction.propTypes = {
  summary: PropTypes.object
}

const mapStateToProps = ({ nba }) => ({
  summary: nba.gameDetails.overview.summary
})

export default connect(
  mapStateToProps
)(SpreadPrediction)
