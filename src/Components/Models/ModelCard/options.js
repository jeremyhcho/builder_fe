const options = {
  legend: {
    display: false
  },
  animation: {
    duration: 0
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        fontSize: 10,
        padding: 4,
        min: 0,
        max: 10
      }
    }],
    xAxes: [{
      ticks: {
        fontSize: 7,
        callback: (label) => label.short,
      },
      gridLines: {
        display: false
      }
    }]
  }
}

export default options
