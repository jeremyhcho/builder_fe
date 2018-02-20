import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// Components
import { CalendarStateless } from '@atlaskit/calendar'
import { Input } from 'Components/Common'

// CSS
import './DateInput.scss'

// Actions
import { fetchNBAGames } from 'Actions'

class DateInput extends React.Component {
  state = {
    isOpened: false,
    day: moment().date(),
    month: moment().month() + 1,
    year: moment().year(),
  }

  componentWillMount() {
    // sets input date to current date
    this.props.fetchNBAGames(this.getFromAndTo(this.props.dates.now._i))
  }

  componentDidMount() {
    // prevent selecting text in Date Input field
    this.dateInput.addEventListener('select', this.preventDateSelection(), false)
  }

  componentWillUnmount() {
    this.dateInput.removeEventListener('select', this.preventDateSelection(), false)
  }

  getFromAndTo (date) {
    const now = moment(date)
    // beginning of current date in EST
    const from = moment(`${date} 21:00:00`).subtract(1, 'day')
    // end of specified date
    const to = moment(`${date} 20:59:59`)

    return { now, from, to }
  }

  getDisabledDates () {
    const lastDateOfMonth = moment().daysInMonth()
    const dayOfLastDate = moment().date(lastDateOfMonth).day()
    const disabledDates = []
    for (let i = moment().date() + 1; i < lastDateOfMonth + (14 - dayOfLastDate); i++) {
      disabledDates.push(moment().date(i).format('YYYY-MM-DD'))
    }
    return disabledDates
  }

  preventDateSelection = () => {
    this.dateInput.selectionStart = this.dateInput.selectionEnd
  }

  focus = () => {
    if (this.calendar) {
      this.calendar.focus()
    }
  }

  changeCalendar = ({ day, month, year }) => {
    // Prevents users from changing to next month unless it is the last day of the month
    const lastDateOfMonth = moment().daysInMonth()
    if ((month > moment().month() + 1 && year === moment().year()) &&
        moment().date() !== lastDateOfMonth) {
      return
    }
    this.setState({ day, month, year })
  }

  openDateInput = () => {
    this.dateInput.focus()
    this.setState({ isOpened: true })
  }

  handleSelect = (e) => {
    // sets date when selected from calendar
    if (e.iso !== this.props.dates.now._i) {
      this.props.fetchNBAGames(this.getFromAndTo(e.iso))
    }
    this.closeCalendar()
  }

  closeDateInput = (e) => {
    // sets date onBlur from input
    if (e.relatedTarget && e.relatedTarget.getAttribute('aria-label') === 'calendar') {
      return
    }
    this.closeCalendar()
  }

  closeCalendar = () => {
    this.setState({
      isOpened: false
    })
  }

  render () {
    const { isOpened, day, month, year } = this.state
    const { dates } = this.props
    return (
      <div styleName="date-input">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Input
            value={moment(dates.now._i, 'YYYY-MM-DD').format('MM/DD/YYYY')}
            type="text"
            style={{
              fontWeight: '600',
              backgroundColor: '#FFF',
              letterSpacing: '1.5px',
              outline: 'none',
              cursor: 'pointer'
            }}
            onBlur={this.closeDateInput}
            inputRef={ref => this.dateInput = ref}
            required
            readOnly
            isLabelHidden
            shouldFitContainer
            onClick={this.openDateInput}
            icon={<i className="fa fa-calendar" aria-hidden="true" onClick={this.openDateInput} />}
          />
        </div>

        {isOpened
          ? <div styleName="calendar">
            <CalendarStateless
              className="calendar"
              selected={dates.now._i}
              day={day}
              month={month}
              year={year}
              ref={ref => {
                this.calendar = ref
              }}
              disabled={this.getDisabledDates()}
              onSelect={this.handleSelect}
              onChange={this.changeCalendar}
            />
          </div>
          : null
        }
      </div>
    )
  }
}

DateInput.propTypes = {
  dates: PropTypes.object.isRequired,
  fetchNBAGames: PropTypes.func.isRequired,
}

const mapStateToProps = ({ nba }) => ({
  dates: nba.dates
})

const mapDispatchToProps = {
  fetchNBAGames
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateInput)
