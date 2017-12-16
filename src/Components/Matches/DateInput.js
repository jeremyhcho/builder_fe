import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'

// Components
import { CalendarStateless } from '@atlaskit/calendar'
// import CalendarIcon from '@atlaskit/icon/glyph/calendar'
import { Input } from 'Components/Common'

// CSS
import './DateInput.scss'

// Actions
import { fetchNBAMatches } from 'Actions'

class DateInput extends React.Component {
  state = {
    isOpened: false,
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  }

  componentWillMount() {
    // sets input date to current date
    const currentDate = moment().format('YYYY-MM-DD')
    this.props.fetchNBAMatches(this.getDates(currentDate))
  }

  getDates = (date) => {
    const now = date
    const from = moment(`${date} 21:00:00`).subtract(5, 'day')
    const to = moment(`${date} 20:59:59`).add(4, 'day')
    return { now, from, to }
  }

  focus = () => {
    if (this.calendar) {
      this.calendar.focus()
    }
  }

  changeInfo = ({ day, month, year }) => {
    this.setState({ day, month, year })
  }

  openDateInput = () => {
    this.dateInput.focus()
    this.setState({ isOpened: true })
  }

  handleSelect = (e) => {
    // sets date when selected from calendar
    console.log(e.iso)
    this.props.fetchNBAMatches(this.getDates(e.iso))
    this.closeCalendar()
  }

  closeDateInput = (e) => {
    // sets date onBlur from input
    if (e.relatedTarget && e.relatedTarget.getAttribute('aria-label') === 'calendar') {
      return
    }
    if (e.target.value) {
      this.props.fetchNBAMatches(this.getDates(e.target.value))
    }
    this.closeCalendar()
  }

  handleDateInput = (e) => {
    if (e.target.value) {
      this.props.fetchNBAMatches(this.getDates(e.target.value))
    }
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
            value={dates.now}
            type="date"
            style={{ fontWeight: '600', backgroundColor: '#FFF', letterSpacing: '1.5px' }}
            // onChange={this.handleDateInput}
            onBlur={this.closeDateInput}
            inputRef={ref => this.dateInput = ref}
            required
            isLabelHidden
            onClick={this.openDateInput}
            icon={<i className="fa fa-calendar" aria-hidden="true" onClick={this.openDateInput} />}
          />
        </div>
        {isOpened
          ? <div styleName="calendar">
            <CalendarStateless
              className="calendar"
              selected={dates.now}
              day={day}
              month={month}
              year={year}
              ref={ref => {
                this.calendar = ref
              }}
              onSelect={this.handleSelect}
              onChange={(date) => this.changeInfo(date)}
            />
          </div>
          : null
        }
      </div>
    )
  }
}

DateInput.defaultProps = {
}

DateInput.propTypes = {
  // getDate: PropTypes.func.isRequired,
  dates: PropTypes.object.isRequired,
  fetchNBAMatches: PropTypes.func.isRequired,
}

const mapStateToProps = ({ dates }) => ({
  dates
})

const mapDispatchToProps = {
  fetchNBAMatches
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateInput)
