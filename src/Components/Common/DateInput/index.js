import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// Components
import { CalendarStateless } from '@atlaskit/calendar'
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
    // sets input date to current date
    const currentDate = `${this.state.month}-${this.state.day}-${this.state.year}`
    this.setState({
      selected: this.convertDate(currentDate)
    }, () => {
      this.props.getDate(currentDate)
    })
  }

  convertDate = (date) => {
    const selectedDate = new Date(date).toISOString()
    return moment(selectedDate).format('dddd, MMMM Do YYYY')
  }

  selectDate = ({ day, month, year }) => {
    const selectedDate = `${month}-${day}-${year}`
    this.setState({
      selected: this.convertDate(selectedDate),
      isOpened: false
    })
    this.props.getDate(selectedDate)
  }

  changeInfo = ({ day, month, year }) => {
    this.setState({ day, month, year })
  }

  focus = () => {
    if (this.calendar) {
      this.calendar.focus()
    }
  }

  openCalendar = () => {
    this.setState({
      isOpened: !this.state.isOpened
    }, () => {
      if (this.state.isOpened) {
        this.focus()
      }
    })
  }

  render () {
    return (
      <div>
        {/* <input
          style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1em' }}
          value={this.state.selected}
          placeholder='mm-dd-yyyy'
          disabled
        /> */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <p>{this.state.selected}</p>
          <button>
            <CalendarIcon label="calendar" onClick={this.openCalendar} />
          </button>
        </div>
        {this.state.isOpened
          ? <CalendarStateless
            selected={this.props.value}
            day={this.state.day}
            month={this.state.month}
            year={this.state.year}
            onBlur={this.openCalendar}
            ref={ref => {
              this.calendar = ref
            }}
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
