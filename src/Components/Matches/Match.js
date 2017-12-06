import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// CSS
import './Matches.scss'
import placeHolderLogo from './lal.png'

const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const styleLogo = {
  width: '80px',
  height: '80px'
}

class Match extends React.Component {
  render () {
    const { match } = this.props
    return (
      <Row styleName="match-container">
        <Col xs={5}>
          <Row style={styleCenter}>
            <Col xs={6}>
              <img src={placeHolderLogo} style={styleLogo} />
            </Col>

            <Col xs={4}>
              <h1>{match.away_team.short_name}</h1>
              <p>{match.away_team.name}</p>
            </Col>

            <Col xs={2}>
              <p>{match.id}</p>
            </Col>
          </Row>
        </Col>

        <Col xs={2} style={styleCenter}>
          <h1 style={{ fontStyle: 'italic' }}>@</h1>
        </Col>

        <Col xs={5} style={{ textAlign: 'right' }}>
          <Row style={styleCenter}>
            <Col xs={2}>
              <p>{match.id}</p>
            </Col>

            <Col xs={4}>
              <h1>{match.home_team.short_name}</h1>
              <p>{match.home_team.name}</p>
            </Col>

            <Col xs={6}>
              <img src={placeHolderLogo} style={styleLogo} />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired
}

export default Match
