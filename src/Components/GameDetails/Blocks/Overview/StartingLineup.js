import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { groupBy, sortBy } from 'lodash'

// Components
import { Card } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// Actions
import { fetchNBAStartingLineup } from 'Actions'

// CSS
import './Overview.scss'

class StartingLineup extends React.Component {
  componentDidMount () {
    this.props.fetchNBAStartingLineup(this.props.matchId)
  }

  formattedLineups () {
    const positions = ['PG', 'SG', 'SF', 'PF', 'C']
    const groupedLineups = groupBy(this.props.startingLineup, (starter) => (
      starter.match_type.toLowerCase()
    ))

    for (const matchType of ['away', 'home']) {
      groupedLineups[matchType] = sortBy(groupedLineups[matchType], (starter) => (
        positions.indexOf(starter.primary_position)
      ))
    }

    return groupedLineups
  }

  render () {
    const { startingLineup, summary } = this.props
    const groupedLineups = this.formattedLineups()
    const positions = ['PG', 'SG', 'SF', 'PF', 'C']

    return (
      <div styleName='starting-lineup'>
        {
          startingLineup && summary ? (
            <Card label='Starting Lineups' wrapperStyle={{ padding: '40px 0' }}>
              <Row style={{ width: '100%' }}>
                <Col xs={5}>
                  <p
                    className='label small'
                    style={{ textAlign: 'right' }}
                  >
                    {summary.away.city}
                  </p>

                  <h4 className='semibold' style={{ textAlign: 'right', marginBottom: '30px' }}>
                    {summary.away.name}
                  </h4>
                  {
                    groupedLineups.away.map((starter, index) => (
                      <p styleName='starter' style={{ textAlign: 'right' }} key={starter.id}>
                        <span className='semibold'>
                          {starter.first_name.slice(0, 1)}. {starter.last_name}
                        </span>

                        <span
                          style={{ marginLeft: '10px' }}
                          className='small label semibold'
                        >
                          {starter.primary_position || positions[index]}
                        </span>
                      </p>
                    ))
                  }
                </Col>

                <Col xs={2}>
                  <hr
                    style={{
                      height: '100%',
                      width: '1px',
                      border: '0',
                      backgroundColor: 'var(--light-gray)'
                    }}
                  />
                </Col>

                <Col xs={5}>
                  <p className='label small'>{summary.home.city}</p>
                  <h4 className='semibold' style={{ marginBottom: '30px' }}>
                    {summary.home.name}
                  </h4>
                  {
                    groupedLineups.home.map((starter, index) => (
                      <p styleName='starter' key={starter.id}>
                        <span
                          style={{ marginRight: '10px' }}
                          className='small label semibold'
                        >
                          {starter.primary_position || positions[index]}
                        </span>

                        <span className='semibold'>
                          {starter.first_name.slice(0, 1)}. {starter.last_name}
                        </span>
                      </p>
                    ))
                  }
                </Col>
              </Row>
            </Card>
          ) : (
            <OverviewSpinner style={{ height: '313px' }} label="Starting Lineups" />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({ routines }) => ({
  startingLineup: routines.nba.startingLineup,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBAStartingLineup
}

StartingLineup.defaultProps = {
  startingLineup: null,
  summary: null
}

StartingLineup.propTypes = {
  startingLineup: PropTypes.array,
  fetchNBAStartingLineup: PropTypes.func.isRequired,
  matchId: PropTypes.string.isRequired,
  summary: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartingLineup)
