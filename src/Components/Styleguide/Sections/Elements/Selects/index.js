import React from 'react'

// Components
import Select from 'Components/Common/Select'

// CSS
import './Selects.scss'

const options = [
  { label: 'Market', value: 'market' },
  { label: 'Route', value: 'route' },
  { label: 'Lorem ipsum dolor sit amet consectetur adipiscing', value: 'lorem' }
]

class Selects extends React.Component {
  state = {
    selectedOption1: '',
    selectedOption2: ''
  }

  render () {
    return (
      <div styleName='selects'>
        <div>
          <p>Default</p>
          <Select
            defaultText='Choices'
            wrapperStyle={{ marginTop: '15px' }}
            options={options}
            onChange={(option) => this.setState({ selectedOption1: option.value })}
            selectedVal={this.state.selectedOption1}
          />
        </div>

        <div>
          <p>Search</p>
          <Select
            defaultText='Choices'
            wrapperStyle={{ marginTop: '15px' }}
            options={options}
            onChange={(option) => this.setState({ selectedOption2: option.value })}
            selectedVal={this.state.selectedOption2}
            search
          />
        </div>
      </div>
    )
  }
}

export default Selects
