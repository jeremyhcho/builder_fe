import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

// Components
import { CalendarStateless } from '@atlaskit/calendar'
import { Input } from 'Components/Common'

// CSS
import './DateInput.scss'

// Actions
import { updateNBAGames } from 'Actions'

class DateInput extends React.Component {
  state = {
    isOpened: false,
    year: Number(this.props.dates.selectedDate.slice(0, 4)) || null,
    month: Number(this.props.dates.selectedDate.slice(5, 7)) || null,
    day: Number(this.props.dates.selectedDate.slice(8)) || null,
  }

  componentDidMount() {
    // prevent selecting text in Date Input field
    this.dateInput.addEventListener('select', this.preventDateSelection(), false)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.location.search !== this.props.location.search && this.props.location.search
      && newProps.location.search) {
      this.props.updateNBAGames(newProps.location.search.slice(6))
    }

    if (newProps.dates.selectedDate !== this.props.dates.selectedDate) {
      return this.setState({
        year: Number(newProps.dates.selectedDate.slice(0, 4)),
        month: Number(newProps.dates.selectedDate.slice(5, 7)),
        day: Number(newProps.dates.selectedDate.slice(8))
      })
    }

    return null
  }

  componentWillUnmount() {
    this.dateInput.removeEventListener('select', this.preventDateSelection(), false)
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
    if (e.iso !== this.props.dates.selectedDate) {
      this.props.updateNBAGames(e.iso)
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
            value={moment(dates.selectedDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}
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
              selected={dates.selectedDate}
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
  updateNBAGames: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ nba }) => ({
  dates: nba.dates
})

const mapDispatchToProps = {
  updateNBAGames
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DateInput))
