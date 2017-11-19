import React from 'react'

// Components
import Checkbox from 'Components/Common/Checkbox'

// CSS
import './Checkboxes.scss'

class Checkboxes extends React.Component {
  state = {
    option1: false,
    option2: true
  }

  handleChange = (e) => {
    this.setState({ [e.target.value]: e.target.checked })
  }

  render () {
    return (
      <div className='flex' styleName='checkboxes'>
        <div className='flex'>
          <p>Default</p>
          <Checkbox
            onChange={this.handleChange}
            value='option1'
            checked={this.state.option1}
            style={{ marginTop: '15px' }}
          >
            Option 1
          </Checkbox>
        </div>

        <div className='flex'>
          <Checkbox
            onChange={this.handleChange}
            value='option2'
            checked={this.state.option2}
            style={{ marginTop: '15px' }}
          >
            Option 2
          </Checkbox>
        </div>

        <div className='flex'>
          <p>Disabled</p>
          <Checkbox
            onChange={this.handleChange}
            style={{ marginTop: '15px' }}
            disabled
          >
            Option 3
          </Checkbox>
        </div>

        <div className='flex'>
          <p>Disabled / Checked</p>
          <Checkbox
            onChange={this.handleChange}
            style={{ marginTop: '15px' }}
            checked
            disabled
          >
            Option 4
          </Checkbox>
        </div>
      </div>
    )
  }
}

export default Checkboxes
