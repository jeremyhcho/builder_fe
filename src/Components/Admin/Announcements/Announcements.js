import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { fetchAnnouncements } from 'Actions'

// Components
import AnnouncementItem from './AnnouncementItem'
import { Button, DocumentTitle } from 'Components/Common'

// Icons
import PlusIcon from 'Assets/Icons/plus.svg'

// CSS
import './Announcements.scss'

class Announcements extends React.Component {
  componentDidMount () {
    this.props.fetchAnnouncements()
  }

  navigateToCreate = () => {
    // console.log('this.props is: ', this.props)
    this.props.history.push({ pathname: '/admin/announcements/new' })
  }

  unpublishedAnnouncements () {
    return this.props.announcements.filter(announcement => !announcement.is_published)
  }

  publishedAnnouncements () {
    return this.props.announcements.filter(announcement => announcement.is_published)
  }

  renderUnpublishedAnnouncements () {
    const unpublishedAnnouncements = this.unpublishedAnnouncements()

    if (!unpublishedAnnouncements.length) return null

    return (
      <div>
        <p className='semibold' style={{ marginBottom: '5px' }}>Draft</p>
        {
          unpublishedAnnouncements.map(announcement => (
            <AnnouncementItem
              announcement={announcement}
              key={announcement.id}
            />
          ))
        }
      </div>
    )
  }

  renderPublishedAnnouncements () {
    const publishedAnnouncements = this.publishedAnnouncements()

    if (!publishedAnnouncements.length) return null

    return (
      <div>
        <p className='semibold' style={{ marginBottom: '5px' }}>Published</p>
        {
          publishedAnnouncements.map(announcement => (
            <AnnouncementItem
              announcement={announcement}
              key={announcement.id}
            />
          ))
        }
      </div>
    )
  }

  render () {
    return (
      <DocumentTitle title='Quze - Admin' header='Announcements'>
        <div styleName='announcements-container'>
          <Button primary onClick={this.navigateToCreate} style={{ position: 'relative', marginBottom: '30px' }}>
            <PlusIcon
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <span style={{ marginLeft: '20px' }}>Create Announcement</span>
          </Button>

          {this.renderUnpublishedAnnouncements()}
          {this.renderPublishedAnnouncements()}
        </div>
      </DocumentTitle>
    )
  }
}

Announcements.defaultProps = {
  announcements: []
}

Announcements.propTypes = {
  fetchAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines, admin }) => ({
  announcements: routines.admin.fetchAnnouncements,
  isAdmin: admin.authState.isAdmin,
  confirmed: admin.authState.confirmed,
})

const mapDispatchToProps = {
  fetchAnnouncements
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Announcements)
