import React from 'react'
import PropTypes from 'prop-types'

// Components
import { CalendarStateless } from '@atlaskit/calendar'
import FieldBase from '@atlaskit/field-base'
import CalendarIcon from '@atlaskit/icon/glyph/calendar'

class DateInput extends React.Component {
  state = {
    isOpened: false,
    selected: '',
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  }

  componentWillMount() {
    this.setState({
      selected: `${this.state.month}-${this.state.day}-${this.state.year}`
    }, () => {
      this.props.getDate(this.state.selected)
    })
  }

  selectDate = ({ day, month, year }) => {
    const newDate = `${month}-${day}-${year}`

    this.setState({
      selected: newDate, isOpened: false
    })
    this.props.getDate(newDate)
  }

  changeInfo = ({ day, month, year }) => {
    this.setState({ day, month, year })
  }

  openCalendar = () => {
    this.setState({ isOpened: true })
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <FieldBase>
          <input
            label="Pick a date"
            style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1em' }}
            value={this.state.selected}
            placeholder='mm-dd-yyyy'
            disabled
          />
          <CalendarIcon label="calendar" onClick={() => this.openCalendar()} />
        </FieldBase>
        {this.state.isOpened
          ? <CalendarStateless
            selected={this.props.value}
            day={this.state.day}
            month={this.state.month}
            year={this.state.year}
            onSelect={(e) => this.selectDate(e)}
            onChange={(date) => this.changeInfo(date)}
          />
          : null
        }
      </div>
    )
  }
}

DateInput.defaultProps = {
  value: '',
}

DateInput.propTypes = {
  value: PropTypes.string,
  getDate: PropTypes.func.isRequired,
}

export default DateInput
