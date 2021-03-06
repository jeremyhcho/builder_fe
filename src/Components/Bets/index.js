import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { groupBy } from 'lodash'
import moment from 'moment-timezone'

// Actions
import { fetchNBABets, closeBetModal, submitEditBet } from 'Actions'

// Components
import {
  DocumentTitle,
  Tab,
  Checkbox,
  Modal,
  Button
} from 'Components/Common'
import BetsByDay from './BetsByDay'
import EditBet from './EditBet'

// CSS
import './Bets.scss'

// Helpers
import { precisionRound } from 'Helpers'

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

const roundTwo = precisionRound(2)

class Bets extends React.Component {
  state = {
    dateFilter: 'today',
    betFilter: 'all'
  }

  componentDidMount () {
    this.props.fetchNBABets()
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.updatingMatchBet && this.props.updatingMatchBet) {
      this.props.closeBetModal()
    }
  }

  handleChange = (e, menuItem) => {
    this.setState({ dateFilter: menuItem.key })
  }

  handleBetFilterChange = (e) => {
    this.setState({ betFilter: e.target.value })
  }

  filterByDate (bets) {
    if (this.state.dateFilter === 'today') {
      return bets.filter(bet => (
        moment().isSame(new Date(bet.match.date), 'day')
      ))
    }

    if (this.state.dateFilter === 'yesterday') {
      return bets.filter(bet => (
        moment()
          .subtract(1, 'day')
          .isSame(moment(new Date(bet.match.date)), 'day')
      ))
    }

    return bets
  }

  filterByType (bets) {
    if (this.state.betFilter === 'all') {
      return bets
    }

    return bets.filter(bet => (
      bet.bet_type === this.state.betFilter
    ))
  }

  filteredBets () {
    let workingBets = this.props.bets

    workingBets = this.filterByDate(workingBets)
    workingBets = this.filterByType(workingBets)

    return workingBets
  }

  groupedBets () {
    return (
      groupBy(this.filteredBets(), (bet) => (
        moment(new Date(bet.match.date)).tz(moment.tz.guess()).format('MMMM Do, YYYY')
      ))
    )
  }

  calculateWinInUnits (bet) {
    if (bet.odds.slice(0, 1) === '-') {
      if (bet.result === 'win') {
        return (100 / parseInt(bet.odds.slice(1), 10)) * bet.units
      }

      if (bet.result === 'tie') {
        return 0
      }

      return bet.units * -1
    }

    if (bet.result === 'win') {
      return ((parseInt(bet.odds.slice(1), 10) / 100) * bet.units)
    }

    if (bet.result === 'tie') {
      return 0
    }

    return bet.units * -1
  }

  parseNetResult (groupedBets) {
    const net = Object.keys(groupedBets).reduce((accum, key) => (
      accum + (
        groupedBets[key]
          .filter(bet => bet.result === 'win' || bet.result === 'loss')
          .reduce((net, bet) => net + this.calculateWinInUnits(bet), 0)
      )
    ), 0)

    return roundTwo(net)
  }

  parseColor (num) {
    if (num === 0) {
      return ''
    }

    return num > 0 ? 'var(--dark-green)' : 'var(--dark-red)'
  }

  renderBetModal () {
    return (
      <Modal
        header='Edit Bet'
        toggle={this.props.closeBetModal}
        isOpen={this.props.openBetModal}
        wrapperStyle={{ width: '500px' }}
        bodyStyle={{ padding: '25px', margin: '0 auto 0 10px' }}
        footer={[
          <Button
            flat
            onClick={this.props.updatingMatchBet ? null : this.props.closeBetModal}
            key="cancel"
          >
            Cancel
          </Button>,
          <Button
            primary={!this.props.updatingMatchBet}
            loading={this.props.updatingMatchBet}
            onClick={this.props.updatingMatchBet ? null : this.props.submitEditBet}
            key="delete"
          >
            Save
          </Button>
        ]}
      >
        <EditBet
          bet={this.props.bets.find(bet => bet.id === this.props.betId)}
        />
      </Modal>
    )
  }

  render () {
    const groupedBets = this.groupedBets()
    const netResult = this.parseNetResult(groupedBets)
    const betsCount = Object.keys(groupedBets).reduce((accum, key) => (
      accum + groupedBets[key].length
    ), 0)
    const totalUnits = Object.keys(groupedBets).reduce((accum, key) => (
      accum + (
        groupedBets[key]
          .filter(bet => bet.result === 'win' || bet.result === 'loss')
          .reduce((net, bet) => net + bet.units, 0)
      )
    ), 0)
    const roi = netResult === 0 ? 0 : roundTwo((netResult / totalUnits) * 100)

    return (
      <DocumentTitle title='Quze - NBA Bets' header='Bets'>
        <div styleName='bets'>
          {this.renderBetModal()}
          <Tab
            tabs={tabItems}
            selectedKey={this.state.dateFilter}
            onChange={this.handleChange}
            listStyle={{ maxWidth: '400px' }}
          />

          <div styleName='bet-wrapper'>
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

            <div styleName='summary'>
              <div styleName='cell'>
                <div>
                  <h3 className='semibold'>
                    {betsCount}
                  </h3>
                  <p className='label'>Bets Placed</p>
                </div>
              </div>

              <div styleName='cell'>
                <div>
                  <h3 className='semibold'>
                    {
                      Object.keys(groupedBets).reduce((accum, key) => (
                        accum + groupedBets[key].filter(bet => bet.result === 'win').length
                      ), 0)
                    }
                  </h3>
                  <p className='label'>Wins</p>
                </div>
              </div>

              <div styleName='cell'>
                <div>
                  <h3 className='semibold'>
                    {
                      Object.keys(groupedBets).reduce((accum, key) => (
                        accum + groupedBets[key].filter(bet => bet.result === 'loss').length
                      ), 0)
                    }
                  </h3>
                  <p className='label'>Losses</p>
                </div>
              </div>

              <div styleName='cell'>
                <div>
                  <h3 className='semibold'>
                    <span style={{ color: this.parseColor(netResult) }}>
                      {netResult > 0 ? `+${netResult}U` : `${netResult}U`}
                    </span>
                  </h3>
                  <p className='label'>Net Result</p>
                </div>
              </div>

              <div styleName='cell'>
                <div>
                  <h3 className='semibold'>
                    <span style={{ color: this.parseColor(roi) }}>
                      {roi > 0 ? `+${roi}%` : `${roi}%`}
                    </span>
                  </h3>
                  <p className='label'>ROI</p>
                </div>
              </div>
            </div>

            <div styleName='bets-list'>
              {
                Object.keys(groupedBets).length ? (
                  Object.keys(groupedBets).map(key => (
                    <BetsByDay
                      bets={groupedBets[key]}
                      date={key}
                      key={key}
                    />
                  ))
                ) : (
                  <h3>No bets were found with the selected filters.</h3>
                )
              }
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

Bets.defaultProps = {
  bets: [],
  updatingMatchBet: false
}

Bets.propTypes = {
  fetchNBABets: PropTypes.func.isRequired,
  bets: PropTypes.array,
  openBetModal: PropTypes.bool.isRequired,
  betId: PropTypes.number.isRequired,
  closeBetModal: PropTypes.func.isRequired,
  updatingMatchBet: PropTypes.bool,
  submitEditBet: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines, nba }) => ({
  bets: routines.nba.bets,
  openBetModal: nba.bets.openBetModal,
  betId: nba.bets.modalBetId,
  updatingMatchBet: routines.isLoading.UPDATE_NBA_MATCH_BET
})

const mapDispatchToProps = {
  fetchNBABets,
  closeBetModal,
  submitEditBet
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bets)
