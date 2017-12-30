import React from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'

class Calendar extends React.Component {
  render () {
    return (
      <div>
        <SingleDatePicker />
      </div>
    )
  }
}

export default Calendar
