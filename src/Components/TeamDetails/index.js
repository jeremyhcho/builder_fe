import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { fetchNBATeamDetails } from 'Actions'

// Components
import { Tab } from 'Components/Common'

// CSS
import './TeamDetails.scss'

const tabItems = [
  { label: 'Overview', key: 'overview' },
  { label: 'Statistics', key: 'stats' },
  { label: 'Trends', key: 'trends' }
]

class TeamDetails extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeamDetails(this.props.match.params.id)
  }

  render () {
    const path = this.props.location.pathname.split('/')
    const route = path.slice(path.length - 1)[0]
    let routeKey
    if (!isNaN(route)) routeKey = 'overview'
    else routeKey = route

    return (
      <div styleName='team-container'>
        <Tab
          tabs={tabItems}
          onChange={(menuItem) => this.setState({ selected: menuItem.key })}
          selectedKey={routeKey}
          listStyle={{ maxWidth: '560px' }}
        />
      </div>
    )
  }
}

TeamDetails.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fetchNBATeamDetails: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  fetchNBATeamDetails
}

export default connect(
  null,
  mapDispatchToProps
)(TeamDetails)
