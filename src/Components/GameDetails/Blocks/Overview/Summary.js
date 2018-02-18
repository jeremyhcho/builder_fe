import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'
import moment from 'moment'

// Components
import { Card } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// CSS
import './Overview.scss'

// Icons
import AtSign from 'Assets/Icons/at-sign.svg'

const wrapperStyle = {
  padding: '50px 25px',
  height: '212px'
}

const Summary = ({ summary }) => {
  if (!summary) return <OverviewSpinner label="Summary" />

  return (
    <Card
      subText={
        <p
          className='small'
          style={{
            padding: '4px 8px',
            backgroundColor: 'var(--navy-blue)',
            color: '#FFF',
            borderRadius: 'var(--border-radius)',
            margin: '0 0 4px 12px'
          }}
        >
          {moment.tz(new Date(summary.date), 'America/New_York').format('ddd, MMM D, YYYY')}
        </p>
      }
      wrapperStyle={wrapperStyle}
    >
      <Row middle='xs' center='xs' style={{ height: '100%', position: 'relative' }}>
        <div
          styleName='summary away'
          style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translateY(-50%) translateX(-78px)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img
            src={summary.away.image}
            style={{
              width: '35px',
              height: '35px',
              marginRight: '15px'
            }}
          />

          <div>
            <p className="label small">{summary.away.city}</p>
            <h2 className="semibold">{summary.away.name.toUpperCase()}</h2>
            <p className="label small">{summary.away.wins}-{summary.away.losses}</p>
          </div>

          <h1 styleName="points away" className="bold">{summary.away.points}</h1>
        </div>

        <h1
          className='semibold'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <AtSign width={16} height={16} />
        </h1>

        <div
          styleName='summary home'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%) translateX(78px)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img
            src={summary.home.image}
            style={{
              width: '35px',
              height: '35px',
              marginLeft: '15px'
            }}
          />

          <div>
            <p className="label small">{summary.home.city}</p>
            <h2 className="semibold">{summary.home.name.toUpperCase()}</h2>
            <p className="label small">{summary.home.wins}-{summary.home.losses}</p>
          </div>

          <h1 styleName='points home' className="bold">{summary.home.points}</h1>
        </div>
      </Row>
    </Card>
  )
}

Summary.defaultProps = {
  summary: null
}

Summary.propTypes = {
  summary: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary
})

export default connect(
  mapStateToProps,
)(Summary)
