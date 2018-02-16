import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { publishAnnouncement } from 'Actions'

// Components
import { Button, Modal } from 'Components/Common'

class PublishAnnouncement extends React.Component {
  publishAnnouncement = () => {
    this.props.publishAnnouncement(this.props.announcement.id, { is_published: true })
  }

  renderBody () {
    if (this.props.announcement.is_published) {
      return (
        <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
          <p>This announcement is already published</p>
        </div>
      )
    }

    return (
      <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
        <p>Are you sure you want to publish this announcement?</p>
      </div>
    )
  }

  renderFooter () {
    if (this.props.announcement.is_published) {
      return [
        <Button
          secondary
          shouldFitContainer
          onClick={this.props.toggle}
          key="cancel"
        >
          Cancel
        </Button>
      ]
    }

    return [
      <Button
        flat
        shouldFitContainer
        onClick={this.props.toggle}
        key="cancel"
      >
        Cancel
      </Button>,
      <Button
        success
        shouldFitContainer
        onClick={this.publishAnnouncement}
        key="delete"
        loading={this.props.publishingAnnouncement}
      >
        Publish
      </Button>
    ]
  }

  render () {
    return (
      <Modal
        header="Publish"
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        footer={this.renderFooter()}
        wrapperStyle={{ width: '500px' }}
      >
        {this.renderBody()}
      </Modal>
    )
  }
}

PublishAnnouncement.defaultProps = {
  publishingAnnouncement: false
}

PublishAnnouncement.propTypes = {
  announcement: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  publishAnnouncement: PropTypes.func.isRequired,
  publishingAnnouncement: PropTypes.bool
}

const mapDispatchToProps = {
  publishAnnouncement
}

export default connect(
  null,
  mapDispatchToProps
)(PublishAnnouncement)
