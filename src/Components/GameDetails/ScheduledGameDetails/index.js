import React from 'react'
import PropTypes from 'prop-types'
// import { Route, Switch, Redirect } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Tab } from 'Components/Common'
// import { Overview, Models } from './Sections'

// CSS
import '../GameDetails.scss'

class ScheduledGameDetails extends React.Component {
  handleNavigation = (e, menuItem) => {
    this.setState({ selected: menuItem.key })
    this.props.history.push(`${this.props.match.url}/${menuItem.key}`)
  }

  render () {
    const tabItems = [
      { label: 'Overview', key: 'overview' },
      { label: 'Models', key: 'models' },
      { label: 'TBD', key: 'tbd' }
    ]
    const path = this.props.location.pathname.split('/')
    const route = path.slice(path.length - 1)[0]
    let routeKey
    if (!isNaN(route)) routeKey = 'overview'
    else routeKey = route
    return (
      <div styleName="game-details scheduled">
        <Row styleName="tabs">
          <Col xs={6}>
            <Tab
              tabs={tabItems}
              selectedKey={routeKey}
              onChange={this.handleNavigation}
              listStyle={{ maxWidth: '560px' }}
            />
          </Col>
        </Row>
        <div className="matches-scroller" styleName="section">
          HELLO WORLD
        </div>
      </div>
    )
  }
}

ScheduledGameDetails.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default ScheduledGameDetails
