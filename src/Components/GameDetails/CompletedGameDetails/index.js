import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Tab } from 'Components/Common'
import ModelView from './ModelView'
import Overview from './Overview'
import PlayerStats from './PlayerStats'
import TeamStats from './TeamStats'

// CSS
import '../GameDetails.scss'

class CompletedGameDetails extends React.Component {
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
      <div styleName="game-details completed">
        <Row styleName="tabs">
          <Col xs={6}>
            <Tab
              tabs={tabItems}
              selectedKey={routeKey}
              onChange={this.handleNavigation}
              listStyle={{ maxWidth: '560px', marginTop: '30px' }}
            />
          </Col>
        </Row>
        <div className='matches-scroller' styleName="section">
          <Switch>
            <Route exact path='/games/:id/overview' component={Overview} />
            <Route exact path='/games/:id/teams' component={TeamStats} />
            <Route exact path='/games/:id/players' component={PlayerStats} />
            <Route exact path='/games/:id/models' component={ModelView} />
            <Redirect to={`/games/${this.props.match.params.id}/overview`} />
          </Switch>
        </div>
      </div>
    )
  }
}

CompletedGameDetails.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default CompletedGameDetails
