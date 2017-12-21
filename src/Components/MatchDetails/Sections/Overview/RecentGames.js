import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, ButtonGroup } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// CSS
import './Overview.scss'

// Actions
import { fetchNBARecentGames } from 'Actions'

class RecentGames extends React.Component {
  componentDidMount() {
    const { fetchNBARecentGames, idProp } = this.props
    fetchNBARecentGames(idProp)
  }

  render () {
    const { recentGames, summary } = this.props
    if (recentGames && summary) {
      const buttons = [
        { label: summary.away.name, key: summary.away.name },
        { label: summary.home.name, key: summary.home.name },
      ]
      return (
        <div>
          <Card label="Recent Games">
            <Row between='xs' middle='xs'>
              <Col xs={6}>
                <h1>Streak W2</h1>
              </Col>

              <Col xs={6}>
                <ButtonGroup
                  buttons={buttons}
                  onChange={(e, button) => this.setState({ selected: button.key })}
                  defaultKey={buttons[0].key}
                />
              </Col>
            </Row>
          </Card>
        </div>
      )
    }
    return (
      <div>
        <OverviewSpinner label="Recent Games" />
      </div>
    )
  }
}

RecentGames.defaultProps = {
  recentGames: {},
  summary: {}
}

RecentGames.propTypes = {
  idProp: PropTypes.string.isRequired,
  fetchNBARecentGames: PropTypes.func.isRequired,
  recentGames: PropTypes.object,
  summary: PropTypes.object
}

const mapStateToProps = ({ matchDetails }) => ({
  summary: matchDetails.overview.summary,
  recentGames: matchDetails.overview.recentGames
})

const mapDispatchToProps = {
  fetchNBARecentGames
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentGames)
