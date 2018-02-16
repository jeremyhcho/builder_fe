import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { uniqBy } from 'lodash'

// Components
import PredictionItem from './PredictionItem'
import { Card, Select } from 'Components/Common'

// Actions
import { fetchRecentPredictions } from 'Actions'

// CSS
import './RecentPredictions.scss'

// Icons
import ColoredAppIcon from 'Assets/Icons/colored-app-cancel.svg'

class RecentPredictions extends React.Component {
  state = {
    selectedModelId: null
  }

  componentDidMount () {
    this.props.fetchRecentPredictions()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.predictions.length && !this.props.predictions.length) {
      this.setState({ selectedModelId: newProps.predictions[0].model_id })
    }
  }

  getModels () {
    const filteredPredictions = uniqBy(this.props.predictions, prediction => prediction.model_id)

    return filteredPredictions.map(prediction => ({
      label: prediction.name,
      value: prediction.model_id
    }))
  }

  filteredPredictions () {
    return this.props.predictions.filter(prediction => (
      prediction.model_id === this.state.selectedModelId
    ))
  }

  changeModel = (e, option) => {
    this.setState({ selectedModelId: option.value })
  }

  renderPredictions () {
    if (!this.props.predictions.length) {
      return (
        <Card style={{ marginTop: 0 }} wrapperStyle={{ height: '500px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <ColoredAppIcon width={100} height={100} />
            <h4 style={{ marginTop: '15px' }}>
              No Active Predictions Found
            </h4>
          </div>
        </Card>
      )
    }

    return (
      <Card
        label="Yesterday's Predictions"
        wrapperStyle={{ padding: '45px 30px' }}
        style={{ marginTop: 0 }}
      >
        <div style={{ width: '200px', marginBottom: '20px' }}>
          <Select
            defaultText='Select a Model'
            options={this.getModels()}
            onChange={this.changeModel}
            selectedVal={this.state.selectedModelId}
          />
        </div>

        {
          this.filteredPredictions().map((prediction, index) => (
            <PredictionItem
              prediction={prediction}
              key={prediction.id}
              index={index}
            />
          ))
        }
      </Card>
    )
  }

  render () {
    return (
      <div styleName='recent-predictions'>
        {this.renderPredictions()}
      </div>
    )
  }
}

RecentPredictions.defaultProps = {
  predictions: []
}

RecentPredictions.propTypes = {
  fetchRecentPredictions: PropTypes.func.isRequired,
  predictions: PropTypes.array
}

const mapStateToProps = ({ routines }) => ({
  predictions: routines.dashboard.fetchRecentPredictions
})

const mapDispatchToProps = {
  fetchRecentPredictions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentPredictions)
