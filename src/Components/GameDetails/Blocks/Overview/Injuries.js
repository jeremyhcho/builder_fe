import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Component
import { Card } from 'Components/Common'
import OverviewSpinner from 'Components/GameDetails/Blocks/OverviewSpinner'

// Actions
import { fetchNBAInjuries } from 'Actions'

// CSS
import './Overview.scss'

const STATUSES_TO_CLASS = {
  'day-to-day': 'gold',
  'out-for-season': 'red',
  out: 'red'
}

const STATUS_TEXTS = {
  'day-to-day': 'GTD',
  'out-for-season': 'OUT',
  out: 'OUT'
}

class Injuries extends React.Component {
  componentDidMount () {
    this.props.fetchNBAInjuries(this.props.matchId)
  }

  disableBodyScroll = () => {
    document.querySelector('.matches-scroller').style.overflowY = 'hidden'
  }

  enableBodyScroll = () => {
    document.querySelector('.matches-scroller').style.overflowY = 'scroll'
  }

  render () {
    const { injuries, summary } = this.props

    const injuriesStyle = classNames('injuries', {
      noMargin: summary.status !== 'CLOSED'
    })

    return (
      <div styleName={injuriesStyle}>
        {
          injuries && summary ? (
            <Card label='Injuries' wrapperStyle={{ padding: '25px 0 25px' }}>
              <div className='label small' styleName='headers'>
                <p style={{ flex: 1 }}>NAME</p>
                <p style={{ flex: 1 }}>STATUS</p>
                <p style={{ flex: 2 }}>DESCRIPTION</p>
              </div>

              <div
                styleName='injury-items'
                onMouseEnter={this.disableBodyScroll}
                onMouseLeave={this.enableBodyScroll}
              >
                {
                  injuries.away.map(injury => {
                    const status = injury.injuries[0].status.toUpperCase()

                    return (
                      <div styleName='injury-item' key={injury.id}>
                        <div style={{ flex: 1 }}>
                          <p className='label small'>{summary.away.name}</p>
                          <p className='semibold' style={{ marginTop: '5px' }}>
                            {injury.first_name.slice(0, 1)}. {injury.last_name}
                          </p>
                        </div>

                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: 'inline-block',
                              height: '100%',
                              lineHeight: '35px',
                              verticalAlign: 'middle'
                            }}
                          >
                            <p
                              className='semibold'
                              styleName={STATUSES_TO_CLASS[status.toLowerCase().replace(/ /g, '-')]}
                            >
                              {STATUS_TEXTS[status.toLowerCase().replace(/ /g, '-')]}
                            </p>
                          </div>
                        </div>

                        <div style={{ flex: 2 }}>
                          <p>{injury.injuries[0].comment}</p>
                        </div>
                      </div>
                    )
                  })
                }
                {
                  injuries.home.map(injury => {
                    const status = injury.injuries[0].status.toUpperCase()

                    return (
                      <div styleName='injury-item' key={injury.id}>
                        <div style={{ flex: 1 }}>
                          <p className='label small'>{summary.home.name}</p>
                          <p className='semibold' style={{ marginTop: '5px' }}>
                            {injury.first_name.slice(0, 1)}. {injury.last_name}
                          </p>
                        </div>

                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: 'inline-block',
                              height: '100%',
                              lineHeight: '35px',
                              verticalAlign: 'middle'
                            }}
                          >
                            <p
                              className='semibold'
                              styleName={STATUSES_TO_CLASS[status.toLowerCase().replace(/ /g, '-')]}
                            >
                              {STATUS_TEXTS[status.toLowerCase().replace(/ /g, '-')]}
                            </p>
                          </div>
                        </div>

                        <div style={{ flex: 2 }}>
                          <p>{injury.injuries[0].comment}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Card>
          ) : (
            <OverviewSpinner label='Injuries' />
          )
        }
      </div>
    )
  }
}

Injuries.defaultProps = {
  injuries: {},
  summary: {}
}

Injuries.propTypes = {
  matchId: PropTypes.string.isRequired,
  injuries: PropTypes.object,
  fetchNBAInjuries: PropTypes.func.isRequired,
  summary: PropTypes.object
}

const mapStateToProps = ({ nba }) => ({
  injuries: nba.gameDetails.overview.injuries,
  summary: nba.gameDetails.overview.summary
})

const mapDispatchToProps = {
  fetchNBAInjuries
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Injuries)
