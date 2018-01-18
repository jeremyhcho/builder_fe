import React from 'react'
import { Doughnut } from 'react-chartjs-2'

// Components
import { Card } from 'Components/Common'

// CSS
import './ModelView.scss'

class TotalPrediction extends React.Component {
  dataFactory () {
    const labels = ['Red', 'Green']
    const datasets = [{
      data: [100, 200],
      backgroundColor: ['#FF6384', '#36A2EB']
    }]

    return { labels, datasets }
  }

  render () {
    return (
      <Card label="Prediction Distribution (Total)" styleName="total-prediction">
        <Doughnut data={this.dataFactory()} />
      </Card>
    )
  }
}

export default TotalPrediction
