import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Checkbox } from 'Components/Common'
import ViewPredictions from './ViewPredictions'

// Actions

// CSS
import './ViewModel.scss'

class ModelHistory extends React.Component {
  state = {
    checkAll: false
  }

  handleChange = (field) => {
    return () => this.setState({ [field]: !this.state[field] })
  }

  render () {
    return (
      <div styleName="model-history">
        <p
          className="semibold"
          styleName="view-label"
        >
          History
        </p>

        <Row styleName="checkboxes">
          <Checkbox
            style={{ margin: '5px 10px 5px 0' }}
            onChange={this.handleChange('checkAll')}
            checked={this.state.checkAll}
          >
            All
          </Checkbox>

          <Checkbox
            style={{ margin: '5px 10px 5px 0' }}
            onChange={this.handleChange('checkScheduled')}
            checked={this.state.checkScheduled}
          >
            Scheduled
          </Checkbox>

          <Checkbox
            style={{ margin: '5px 10px 5px 0' }}
            onChange={this.handleChange('checkClosed')}
            checked={this.state.checkClosed}
          >
            Closed
          </Checkbox>
        </Row>

        <ViewPredictions />
      </div>
    )
  }
}

export default connect()(ModelHistory)
