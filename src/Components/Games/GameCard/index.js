import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'moment-timezone'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'

// Icons
import AtSign from 'Assets/Icons/at-sign.svg'
import LeftArrow from 'Assets/Icons/left-arrow.svg'

// CSS
import './GameCard.scss'

class GameCard extends React.Component {
  getWinner (teamPoints) {
    const { game } = this.props

    let opponent

    if (teamPoints === game.away.points) opponent = game.home.points
    if (teamPoints === game.home.points) opponent = game.away.points

    if (teamPoints > opponent) return true
    return false
  }

  getLoser (teamPoints) {
    const { game } = this.props

    let opponent
    if (teamPoints === game.away.points) opponent = game.home.points
    if (teamPoints === game.home.points) opponent = game.away.points

    if (teamPoints < opponent) return true
    return false
  }

  viewMatch = () => {
    const { history, game } = this.props
    history.push(`${history.location.pathname}/${game.id}`)
  }

  renderGameStatus () {
    const { game } = this.props
    const time = game.date.tz('America/New_York')

    switch (game.status) {
      case 'SCHEDULED':
        if (time.minutes() === 0) return time.format('hA')

        return time.format('h:mmA')

      case 'INPROGRESS':
        return 'IN PROGRESS'

      case 'CLOSED':
        return 'FINAL'

      case 'POSTPONED'
        return 'POSTPONED'

      default:
        return null
    }
  }

  render () {
    const { game, isTrial } = this.props

    return (
      <Row styleName="game-container" middle='xs' onClick={this.viewMatch}>
        {isTrial && game.trial && (
          <p styleName="free-game">FREE GAME</p>
        )}

        <Col
          xs={4}
          style={{
            textAlign: 'right',
            paddingRight: '50px',
            position: 'relative',
            color: this.getLoser(game.away.points) ? 'rgba(72, 84, 93, 0.4)' : null
          }}
        >
          <div style={{ display: 'inline-block' }}>
            <p className={this.getLoser(game.away.points) ? 'small' : 'small label'}>
              {game.away.city}
            </p>
            <h1 className="bold">{game.away.name.toUpperCase()}</h1>
            <p className='small'>{game.away.wins}-{game.away.losses}</p>
          </div>

          <img
            src={game.away.image}
            style={{
              width: '35px',
              height: '35px',
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)'
            }}
          />
        </Col>

        <Col
          xs={1}
          style={{
            textAlign: 'center',
            position: 'relative',
            color: this.getLoser(game.away.points) ? 'rgba(72, 84, 93, 0.4)' : null
          }}
        >
          {this.getWinner(game.away.points) && <LeftArrow height={26} styleName='left-arrow' />}
          <h2 className="bold">{game.away.points}</h2>
        </Col>

        <Col xs={2} styleName="col-direction">
          <h1 className="semibold"><AtSign width={16} height={16} /></h1>
          <p className="small semibold" style={{ marginTop: '5px' }}>
            {this.renderGameStatus()}
          </p>
        </Col>

        <Col
          xs={1}
          style={{
            textAlign: 'center',
            position: 'relative',
            color: this.getLoser(game.home.points) ? 'rgba(72, 84, 93, 0.4)' : null
          }}
        >
          {this.getWinner(game.home.points) && <LeftArrow height={26} styleName='right-arrow' />}
          <h2 className="bold">{game.home.points}</h2>
        </Col>

        <Col
          xs={4}
          style={{
            paddingLeft: '50px',
            position: 'relative',
            color: this.getLoser(game.home.points) ? 'rgba(72, 84, 93, 0.4)' : null
          }}
        >
          <img
            src={game.home.image}
            style={{
              width: '35px',
              height: '35px',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />

          <div style={{ display: 'inline-block' }}>
            <p className={this.getLoser(game.home.points) ? 'small' : 'small label'}>
              {game.home.city}
            </p>
            <h1 className="bold">{game.home.name.toUpperCase()}</h1>
            <p className='small'>{game.home.wins}-{game.home.losses}</p>
          </div>
        </Col>
      </Row>
    )
  }
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isTrial: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  isTrial: auth.authState.user.trial
})

export default withRouter(connect(
  mapStateToProps
)(GameCard))
