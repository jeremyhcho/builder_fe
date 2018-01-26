import { Chart } from 'react-chartjs-2'
/* eslint-disable */
const createNewChart = () => {
  Chart.defaults.DoubleFillLine = Chart.helpers.clone(Chart.defaults.line)
  return Chart.controllers.DoubleFillLine = Chart.controllers.line.extend({
    update: function () {
      const yValues = this._data.map(plot => plot.y).sort((a, b) => a - b)

      const min = yValues[0];
      const max = yValues[yValues.length - 1];
      const yScale = this.getScaleForId(this.getDataset().yAxisId);

      const top = yScale.getPixelForValue(max);
      const zero = yScale.getPixelForValue(0);
      const bottom = yScale.getPixelForValue(min);

      const ctx = this.chart.chart.ctx;
      const gradient = ctx.createLinearGradient(0, top, 0, bottom);
      const ratio = Math.min((zero - top) / (bottom - top), 1);
      gradient.addColorStop(0, 'rgba(60, 144, 223, 0.15)');
      gradient.addColorStop(ratio, 'rgba(60, 144, 223, 0.15)');
      gradient.addColorStop(ratio, 'rgba(254, 74, 73, 0.15)');
      gradient.addColorStop(1, 'rgba(254, 74, 73, 0.15)');
      this.chart.data.datasets[0].backgroundColor = gradient;

      return Chart.controllers.line.prototype.update.apply(this, arguments);
    }
  })
}

export default createNewChart
