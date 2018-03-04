import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { groupBy } from 'lodash'
import moment from 'moment'

// Actions
import { fetchNBABets } from 'Actions'

// Components
import {
  DocumentTitle,
  Tab,
  Checkbox
} from 'Components/Common'
import BetsByDay from './BetsByDay'

// CSS
import './Bets.scss'

const tabItems = [
  { label: 'Today', key: 'today' },
  { label: 'Yesterday', key: 'yesterday' },
  { label: 'Lifetime', key: 'lifetime' }
]

const betFilters = [
  'all',
  'moneyline',
  'spread',
  'total'
]

class Bets extends React.Component {
  state = {
    dateFilter: 'today',
    betFilter: 'all'
  }

  componentDidMount () {
    this.props.fetchNBABets()
  }

  handleChange = (e, menuItem) => {
    this.setState({ dateFilter: menuItem.key })
  }

  handleBetFilterChange = (e) => {
    this.setState({ betFilter: e.target.value })
  }

  groupedBets () {
    return (
      groupBy(this.props.bets, (bet) => (
        moment(new Date(bet.updated_at)).format('MMMM Do, YYYY')
      ))
    )
  }

  render () {
    const groupedBets = this.groupedBets()

    return (
      <DocumentTitle title='Quartz - NBA Bets' header='Bets'>
        <div styleName='bets'>
          <Tab
            tabs={tabItems}
            selectedKey={this.state.dateFilter}
            onChange={this.handleChange}
            listStyle={{ maxWidth: '400px' }}
          />

          <div styleName='bet-filters'>
            {
              betFilters.map(betFilter => (
                <Checkbox
                  onChange={this.handleBetFilterChange}
                  value={betFilter}
                  checked={this.state.betFilter === betFilter}
                  key={betFilter}
                >
                  {betFilter.slice(0, 1).toUpperCase() + betFilter.slice(1)}
                </Checkbox>
              ))
            }
          </div>

          <div styleName='bets-list'>
            {
              Object.keys(groupedBets).map(key => (
                <BetsByDay
                  bets={groupedBets[key]}
                  date={key}
                  key={key}
                />
              ))
            }
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

Bets.defaultProps = {
  bets: []
}

Bets.propTypes = {
  fetchNBABets: PropTypes.func.isRequired,
  bets: PropTypes.array
}

const mapStateToProps = ({ routines }) => ({
  bets: routines.nba.bets
})

const mapDispatchToProps = {
  fetchNBABets
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bets)
