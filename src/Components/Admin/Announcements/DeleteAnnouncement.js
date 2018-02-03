import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Button, Modal } from 'Components/Common'

// Icons
import ErrorIcon from 'Assets/Icons/error.svg'

// Actions
import { deleteAnnouncement } from 'Actions'

class DeleteAnnouncement extends React.Component {
  deleteModel = () => {
    this.props.deleteAnnouncement(this.props.announcement.id)
  }

  renderFooter () {
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
        danger
        shouldFitContainer
        onClick={this.deleteModel}
        key="delete"
        loading={this.props.deletingAnnouncement}
      >
        Delete
      </Button>
    ]
  }

  render () {
    return (
      <Modal
        header="Delete Announcement"
        headerIcon={ErrorIcon}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        footer={this.renderFooter()}
        bodyStyle={{ width: '500px' }}
      >
        <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
          <p>A deleted announcement cannot be restored and all its contents will be lost.</p>
        </div>
      </Modal>
    )
  }
}

DeleteAnnouncement.defaultProps = {
  deletingAnnouncement: false
}

DeleteAnnouncement.propTypes = {
  announcement: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  deleteAnnouncement: PropTypes.func.isRequired,
  deletingAnnouncement: PropTypes.bool
}

const mapDispatchToProps = {
  deleteAnnouncement
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteAnnouncement)
