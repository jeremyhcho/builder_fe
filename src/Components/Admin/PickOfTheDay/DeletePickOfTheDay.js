import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Button, Modal } from 'Components/Common'

// Icons
import ErrorIcon from 'Assets/Icons/error.svg'

// Actions
import { deletePickOfTheDay } from 'Actions'

class DeletePickOfTheDay extends React.Component {
  deletePickOfTheDay = () => {
    this.props.deletePickOfTheDay(this.props.potd.id)
  }

  renderFooter () {
    return [
      <Button
        flat={!this.props.deletingPickOfTheDay}
        disabled={this.props.deletingPickOfTheDay}
        shouldFitContainer
        onClick={this.props.deletingPickOfTheDay ? null : this.props.toggle}
        key="cancel"
      >
        Cancel
      </Button>,
      <Button
        danger
        shouldFitContainer
        onClick={this.props.deletingPickOfTheDay ? null : this.deletePickOfTheDay}
        key="delete"
        loading={this.props.deletingPickOfTheDay}
      >
        Delete
      </Button>
    ]
  }

  render () {
    return (
      <Modal
        header="Delete Pick of the Day"
        headerIcon={ErrorIcon}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        footer={this.renderFooter()}
        wrapperStyle={{ width: '500px' }}
      >
        <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
          <p>A deleted announcement cannot be restored and all its contents will be lost.</p>
        </div>
      </Modal>
    )
  }
}

DeletePickOfTheDay.defaultProps = {
  deletingPickOfTheDay: false
}

DeletePickOfTheDay.propTypes = {
  potd: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  deletePickOfTheDay: PropTypes.func.isRequired,
  deletingPickOfTheDay: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  deletingPickOfTheDay: routines.callingApi.DELETE_PICK_OF_THE_DAY
})

const mapDispatchToProps = {
  deletePickOfTheDay
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePickOfTheDay)
