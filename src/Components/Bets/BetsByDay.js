import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './Bets.scss'

// Components
import BetRow from './BetRow'

const BetsByDay = ({ date, bets }) => (
  <div styleName='bets-by-day'>
    <h3 className='semibold' style={{ marginBottom: '20px' }}>{date}</h3>
    <ul>
      {
        bets.map(bet => (
          <BetRow bet={bet} key={bet.id} />
        ))
      }
    </ul>
  </div>
)

BetsByDay.propTypes = {
  bets: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired
}

export default BetsByDay
