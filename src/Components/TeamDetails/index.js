import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Switch, Route, Redirect } from 'react-router-dom'

// Components
import { Tab, DocumentTitle } from 'Components/Common'
import Overview from './Overview'
import Schedule from './Schedule'
import Roster from './Roster'

// Actions
import { fetchNBATeamDetails } from 'Actions'

// CSS
import './TeamDetails.scss'

const tabItems = [
  { label: 'Overview', key: 'overview' },
  { label: 'Schedule', key: 'schedule' },
  { label: 'Roster', key: 'roster' }
]

class TeamDetails extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeamDetails(this.props.match.params.id)
  }

  handleNavigation = (e, menuItem) => {
    this.setState({ selected: menuItem.key })
    this.props.history.push(`${this.props.match.url}/${menuItem.key}`)
  }

  render () {
    const path = this.props.location.pathname.split('/')
    const route = path.slice(path.length - 1)[0]
    let routeKey
    if (!isNaN(route)) routeKey = 'overview'
    else routeKey = route

    return (
      <DocumentTitle title='Quartz - NBA Team Details' header='Team Details' backUrl='/teams'>
        <div styleName='team-details'>
          <Row styleName="tabs">
            <Col xs={12}>
              <Tab
                tabs={tabItems}
                onChange={this.handleNavigation}
                selectedKey={routeKey}
                listStyle={{ maxWidth: '420px', marginTop: '30px' }}
              />
            </Col>
          </Row>

          <div className='matches-scroller' styleName="section">
            {
              Object.keys(this.props.teamDetails).length ? (
                <Switch>
                  <Route exact path='/teams/:id/overview' component={Overview} />
                  <Route exact path='/teams/:id/schedule' component={Schedule} />
                  <Route exact path='/teams/:id/roster' component={Roster} />
                  <Redirect to={`/teams/${this.props.match.params.id}/overview`} />
                </Switch>
              ) : <div />
            }
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

TeamDetails.defaultProps = {
  teamDetails: {}
}

TeamDetails.propTypes = {
  teamDetails: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fetchNBATeamDetails: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  teamDetails: routines.nba.teamDetails
})

const mapDispatchToProps = {
  fetchNBATeamDetails
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamDetails)
