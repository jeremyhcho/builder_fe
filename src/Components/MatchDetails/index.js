import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Tab } from 'Components/Common'
import { Overview, PlayerStats, TeamStats, Models } from './Sections'

// CSS
import './MatchDetails.scss'

// Actions
import { fetchNBASummary } from 'Actions'

const sectionStyle = {
  marginTop: '15px',
  overflowY: 'scroll',
  height: 'calc(100vh - 150px)',
  padding: '0 65px 25px 65px',
}

class MatchDetails extends React.Component {
  componentDidMount () {
    this.props.fetchNBASummary(this.props.match.params.id)
  }

  handleNavigation = (e, menuItem) => {
    this.setState({ selected: menuItem.key })
    this.props.history.push(`${this.props.match.url}/${menuItem.key}`)
  }

  render () {
    const tabItems = [
      { label: 'Overview', key: 'overview' },
      { label: 'Models', key: 'models' },
      { label: 'Player Stats', key: 'players' },
      { label: 'Team Stats', key: 'teams' }
    ]
    const path = this.props.location.pathname.split('/')
    const route = path.slice(path.length - 1)[0]
    let routeKey
    if (!isNaN(route)) routeKey = 'overview'
    else routeKey = route
    return (
      <div>
        <Row style={{ marginTop: '15px', padding: '0 65px' }}>
          <Col xs={6}>
            <Tab
              tabs={tabItems}
              selectedKey={routeKey}
              onChange={this.handleNavigation}
              listStyle={{ maxWidth: '560px' }}
            />
          </Col>
        </Row>
        <div className='matches-scroller' style={sectionStyle}>
          <Switch>
            <Route exact path='/matches/:id/overview' component={Overview} />
            <Route exact path='/matches/:id/teams' component={TeamStats} />
            <Route exact path='/matches/:id/players' component={PlayerStats} />
            <Route exact path='/matches/:id/models' component={Models} />
            <Redirect to={`/matches/${this.props.match.params.id}/overview`} />
          </Switch>
        </div>
      </div>
    )
  }
}

MatchDetails.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchNBASummary: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  fetchNBASummary
}

export default connect(
  null,
  mapDispatchToProps
)(MatchDetails)
