import { precisionRound } from 'Helpers'

const tenths = precisionRound(1)

const options = {
  maintainAspectRatio: false,
  animation: {
    duration: 0
  },
  tooltips: {
    callbacks: {
      label: (tooltip, { datasets, labels }) => {
        const label = labels[tooltip.index]
        const data = datasets[0].data[tooltip.index]
        return `${label} ${tenths(data * 100)}%`
      }
    }
  },
  legend: {
    onClick: () => null,
    position: 'right',
    labels: {
      boxWidth: 14,
      fontColor: '#48545D',
      fontFamily: '"proxima-nova", "sans-serif"',
      fontStyle: 'bold',
      fontSize: 14,
      padding: 25
    }
  },
  layout: {
    padding: {
      right: 30,
      left: 15
    }
  }
}

export default options
