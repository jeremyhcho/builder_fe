import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { publishPickOfTheDay } from 'Actions'

// Components
import { Button, Modal } from 'Components/Common'

class PublishPickOfTheDay extends React.Component {
  publishPickOfTheDay = () => {
    this.props.publishPickOfTheDay(this.props.potd.id, { is_published: true })
  }

  renderBody () {
    if (this.props.potd.is_published) {
      return (
        <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
          <p>This Pick of the Day is already published</p>
        </div>
      )
    }

    return (
      <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
        <p>Are you sure you want to publish this Pick of the Day?</p>
      </div>
    )
  }

  renderFooter () {
    const { publishingPickOfTheDay, toggle, potd } = this.props

    if (potd.is_published) {
      return [
        <Button
          secondary
          shouldFitContainer
          onClick={toggle}
          key="cancel"
        >
          Cancel
        </Button>
      ]
    }

    return [
      <Button
        flat={!publishingPickOfTheDay}
        disabled={publishingPickOfTheDay}
        shouldFitContainer
        onClick={publishingPickOfTheDay ? null : toggle}
        key="cancel"
      >
        Cancel
      </Button>,
      <Button
        success
        shouldFitContainer
        onClick={this.props.publishingPickOfTheDay ? null : this.publishPickOfTheDay}
        key="publish"
        loading={this.props.publishingPickOfTheDay}
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
        bodyStyle={{ width: '500px' }}
      >
        {this.renderBody()}
      </Modal>
    )
  }
}

PublishPickOfTheDay.defaultProps = {
  publishingPickOfTheDay: false
}

PublishPickOfTheDay.propTypes = {
  potd: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  publishPickOfTheDay: PropTypes.func.isRequired,
  publishingPickOfTheDay: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  publishingPickOfTheDay: routines.isLoading.PUBLISH_PICK_OF_THE_DAY
})

const mapDispatchToProps = {
  publishPickOfTheDay
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishPickOfTheDay)
