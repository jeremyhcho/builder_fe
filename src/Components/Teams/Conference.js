import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import { withRouter } from 'react-router'

// Components
import { Card } from 'Components/Common'

// CSS
import './Teams.scss'

// SVG
import RightArrow from 'Assets/Icons/right-arrow.svg'

class Conference extends React.Component {
  conferenceLabel () {
    const { teams } = this.props
    const firstLetter = teams[0].conference.slice(0, 1)
    const restOfLetters = teams[0].conference.slice(1).toLowerCase()
    const conferenceName = firstLetter + restOfLetters

    return `${conferenceName}ern Conference`
  }

  navigateToTeam (id) {
    return () => this.props.history.push(`/teams/${id}`)
  }

  render () {
    const { teams } = this.props

    return (
      <Col xs={12} styleName='conference'>
        <p className='semibold'>
          {this.conferenceLabel()}
        </p>

        <Row>
          <Col xs={12}>
            {
              teams.map((team, index) => (
                <Card key={team.id} style={{ height: 'auto', marginTop: '10px' }}>
                  <div styleName='team-item' onClick={this.navigateToTeam(team.id)}>
                    <div styleName='team-details'>
                      <p
                        className='semibold'
                        style={{
                          display: 'inline-block',
                          marginRight: '10px',
                          width: '20px'
                        }}
                      >
                        {index + 1}
                      </p>

                      <img
                        src={team.image}
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '15px'
                        }}
                      />

                      <p className='label semibold' style={{ display: 'inline-block' }}>
                        {team.city}&nbsp;
                        <span className='semibold' style={{ color: 'var(--font-color)' }}>
                          {team.name}
                        </span>
                      </p>
                    </div>

                    <div className='semibold small' styleName='team-record'>
                      <p
                        style={{
                          lineHeight: '17px',
                          verticalAlign: 'middle'
                        }}
                      >
                        {team.wins}W - {team.losses}L
                      </p>
                    </div>

                    <div styleName='right-arrow' style={{ lineHeight: '11px' }}>
                      <RightArrow />
                    </div>
                  </div>
                </Card>
              ))
            }
          </Col>
        </Row>
      </Col>
    )
  }
}

Conference.propTypes = {
  teams: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(Conference)
