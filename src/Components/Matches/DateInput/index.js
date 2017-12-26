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
    this.props.fetchNBAMatches(this.props.dates.now._i)
  }

  componentDidMount() {
    // prevent selecting text in Date Input field
    this.dateInput.addEventListener('select', () => {
      this.dateInput.selectionStart = this.dateInput.selectionEnd
    }, false)
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
    if (e.iso !== this.props.dates.now._i) {
      this.props.fetchNBAMatches(e.iso)
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
            style={{ fontWeight: '600', backgroundColor: '#FFF', letterSpacing: '1.5px', outline: 'none' }}
            onBlur={this.closeDateInput}
            inputRef={ref => this.dateInput = ref}
            required
            readOnly
            isLabelHidden
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

DateInput.propTypes = {
  // getDate: PropTypes.func.isRequired,
  dates: PropTypes.object.isRequired,
  fetchNBAMatches: PropTypes.func.isRequired,
}

const mapStateToProps = ({ games }) => ({
  dates: games.dates
})

const mapDispatchToProps = {
  fetchNBAMatches
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateInput)
