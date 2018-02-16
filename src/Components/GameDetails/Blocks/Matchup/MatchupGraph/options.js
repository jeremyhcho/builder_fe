const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        stepSize: 2
      },
      scaleLabel: {
        display: true,
        labelString: 'Points',
        fontStyle: 'bold'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Quarters',
        fontStyle: 'bold'
      }
    }]
  },
  layout: {
    padding: {
      left: 40,
      right: 40,
      top: 0,
      bottom: 0
    }
  }
}

export default options
