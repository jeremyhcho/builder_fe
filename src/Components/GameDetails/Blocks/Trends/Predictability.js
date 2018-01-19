import React from 'react'
import { Line } from 'react-chartjs-2'

class Predictability extends React.Component {
  dataFactory () {
    const labels = [1, 2]
    const datasets = [{
      label: 'Model Predictions',
      data: [5, 10]
    }]

    return { labels, datasets }
  }

  render () {
    return (
      <div>
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
      </div>
    )
  }
}

export default Predictability
