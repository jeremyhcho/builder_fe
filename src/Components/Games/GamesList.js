import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import { groupBy } from 'lodash'

// CSS
import './Games.scss'

// Components
import DayWrapper from './DayWrapper'

class GamesList extends React.Component {
  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  groupedMatches() {
    const groupedMatches = groupBy(this.props.games, (game) => (
      game.date.tz('America/New_York').format('D dddd MMMM')
    ))
    // split games by date, then sort games by time of the day
    for (const date in groupedMatches) {
      if (groupedMatches[date]) {
        groupedMatches[date].sort((gameA, gameB) => (
          gameA.date.format('H.mm') - gameB.date.format('H.mm')
        ))
      }
    }

    return groupedMatches
  }

  render () {
    const groupedMatches = this.groupedMatches()

    return (
      <Row style={{ position: 'relative' }}>
        <p
          className='small'
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'right',
            padding: '0 35px 10px 0',
            maxWidth: '1600px',
            marginLeft: '65px'
          }}
        >
          All times displayed in EST
        </p>

        <div
          styleName="matches-container"
          ref={ref => {
            this.scroller = ref
          }}
        >
          <Row style={{ width: '100%', maxWidth: '1600px', position: 'relative' }}>
            <Col xs={12}>
              {
                Object.keys(groupedMatches).map((date) => (
                  <DayWrapper
                    games={groupedMatches[date]}
                    key={date}
                    date={date}
                  />
                ))
              }
            </Col>
          </Row>
        </div>
      </Row>
    )
  }
}

GamesList.propTypes = {
  games: PropTypes.array.isRequired
}

export default GamesList
