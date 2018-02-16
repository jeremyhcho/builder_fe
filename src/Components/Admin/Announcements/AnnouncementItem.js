import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import { Card, Tooltip } from 'Components/Common'
import DeleteAnnouncement from './DeleteAnnouncement'
import PublishAnnouncement from './PublishAnnouncement'

// CSS
import './Announcements.scss'

// Icons
import EditPencil from 'Assets/Icons/edit-pencil.svg'
import PublishIcon from 'Assets/Icons/publish.svg'
import RemoveIcon from 'Assets/Icons/remove.svg'

class AnnouncementItem extends React.Component {
  state = {
    showDeleteModal: false,
    showPublishModal: false
  }

  componentWillReceiveProps (newProps) {
    if (this.props.publishingAnnouncement && !newProps.publishingAnnouncement) {
      this.togglePublishModal()
    }
  }

  toggleDeleteModal = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal })
  }

  togglePublishModal = () => {
    this.setState({ showPublishModal: !this.state.showPublishModal })
  }

  navigateToEdit = () => {
    this.props.history.push({ pathname: `/admin/announcements/edit/${this.props.announcement.id}` })
  }

  render () {
    const { announcement } = this.props

    return (
      <Card
        wrapperStyle={{ padding: '15px 20px' }}
        style={{ marginBottom: '15px', marginTop: 0, position: 'relative' }}
      >
        <div style={{ display: 'flex' }}>
          <p styleName='title'>
            {announcement.title}
          </p>

          <ul styleName='actions'>
            <li>
              <div
                styleName='icon-wrapper'
                data-tip-for={`announcement-edit-${announcement.id}`}
                onClick={this.navigateToEdit}
              >
                <EditPencil />
                <Tooltip id={`announcement-edit-${announcement.id}`} pos='top'>
                  Edit
                </Tooltip>
              </div>
            </li>

            <li>
              <div
                styleName='icon-wrapper'
                onClick={this.togglePublishModal}
                data-tip-for={`announcement-publish-${announcement.id}`}
              >
                <PublishIcon />
                <Tooltip id={`announcement-publish-${announcement.id}`} pos='top'>
                  Publish
                </Tooltip>
              </div>
            </li>

            <li>
              <div
                styleName='icon-wrapper'
                onClick={this.toggleDeleteModal}
                data-tip-for={`announcement-delete-${announcement.id}`}
              >
                <RemoveIcon />
                <Tooltip id={`announcement-delete-${announcement.id}`} pos='top'>
                  Delete
                </Tooltip>
              </div>
            </li>
          </ul>
        </div>

        <DeleteAnnouncement
          isOpen={this.state.showDeleteModal}
          toggle={this.toggleDeleteModal}
          announcement={this.props.announcement}
          deletingAnnouncement={this.props.deletingAnnouncement}
        />

        <PublishAnnouncement
          isOpen={this.state.showPublishModal}
          toggle={this.togglePublishModal}
          announcement={announcement}
          publishingAnnouncement={this.props.publishingAnnouncement}
        />
      </Card>
    )
  }
}

AnnouncementItem.defaultProps = {
  publishingAnnouncement: false,
  deletingAnnouncement: false
}

AnnouncementItem.propTypes = {
  announcement: PropTypes.object.isRequired,
  publishingAnnouncement: PropTypes.bool,
  deletingAnnouncement: PropTypes.bool,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines }) => ({
  publishingAnnouncement: routines.isLoading.PUBLISH_ANNOUNCEMENT,
  deletingAnnouncement: routines.isLoading.DELETE_ANNOUNCEMENT
})

export default withRouter(connect(
  mapStateToProps
)(AnnouncementItem))
