import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { CalendarStateless } from '@atlaskit/calendar'
import { Input } from 'Components/Common'

// CSS
import './Matches.scss'

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
    this.props.fetchNBAMatches(e.iso)
    this.closeCalendar()
  }

  closeDateInput = (e) => {
    // sets date onBlur from input
    if (e.relatedTarget && e.relatedTarget.getAttribute('aria-label') === 'calendar') {
      return
    }
    if (e.target.value) {
      this.props.fetchNBAMatches(e.target.value)
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
            value={dates.now._i}
            type="date"
            style={{ fontWeight: '600', backgroundColor: '#FFF', letterSpacing: '1.5px' }}
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
