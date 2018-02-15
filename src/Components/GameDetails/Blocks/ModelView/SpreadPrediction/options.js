import { precisionRound } from 'Helpers'

const ones = precisionRound(0)
const tenths = precisionRound(1)

const options = {
  linear: true,
  legend: {
    onClick: () => null,
    labels: {
      filter: (legendItem) => {
        return legendItem.text !== 'Fit data line'
      }
    }
  },
  tooltips: {
    callbacks: {
      title: (tooltips) => {
        return `Model win rate: ${tenths(tooltips[0].xLabel * 100)}%`
      }
    }
  },
  animation: {
    easing: 'linear',
    duration: 200
  },
  scales: {
    yAxes: [{
      type: 'linear',
      ticks: {
        stepSize: 2,
      },
      gridLines: {
        display: false
      },
      scaleLabel: {
        display: true,
        labelString: 'Model Predictions',
        fontStyle: 'bold'
      }
    }],
    xAxes: [{
      type: 'linear',
      ticks: {
        callback: (currValue) => {
          return `${ones(currValue * 100)}%`
        }
      },
      gridLines: {
        display: false
      },
      scaleLabel: {
        display: true,
        labelString: 'Model Win %',
        fontStyle: 'bold'
      }
    }]
  }
}

export default options
