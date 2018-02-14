import moment from 'moment'

const options = {
  maintainAspectRatio: false,
  linear: true,
  legend: {
    display: false
  },
  animation: {
    duration: 500
  },
  tooltips: {
    callbacks: {
      title: (tooltips, data) => {
        const tooltipIndex = tooltips[0].index
        const dataset = data.datasets[0].data
        return moment(dataset[tooltipIndex].x).format('ddd, MMM D, YYYY')
      }
    }
  },
  scales: {
    yAxes: [{
      ticks: {
      },
      gridLines: {
        display: false
      },
      scaleLabel: {
        display: true,
        labelString: 'Outcome vs. Vegas Difference',
        fontStyle: 'bold'
      }
    }],
    xAxes: [{
      type: 'time',
      distribution: 'series',
      ticks: {
        source: 'data',
        callback: (value, index) => {
          if (index % 2 === 0) return value
          return ''
        },
        // stepSize: 2,
        maxRotation: 60,
        minRotation: 60
      },
      time: {
        unit: 'day',
        displayFormats: {
          day: 'MMM DD'
        },
      },
      gridLines: {
        display: false
      },
      scaleLabel: {
        display: true,
        labelString: 'Time',
        fontStyle: 'bold'
      }
    }]
  }
}

export default options
