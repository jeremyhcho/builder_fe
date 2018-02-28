import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import { Card, Tooltip } from 'Components/Common'
import DeletePickOfTheDay from './DeletePickOfTheDay'
import PublishPickOfTheDay from './PublishPickOfTheDay'

// CSS
import './PickOfTheDay.scss'

// Icons
import EditPencil from 'Assets/Icons/edit-pencil.svg'
import PublishIcon from 'Assets/Icons/publish.svg'
import RemoveIcon from 'Assets/Icons/remove.svg'

class PickOfTheDayItem extends React.Component {
  state = {
    showDeleteModal: false,
    showPublishModal: false
  }

  toggleDeleteModal = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal })
  }

  togglePublishModal = () => {
    this.setState({ showPublishModal: !this.state.showPublishModal })
  }

  navigateToEdit = () => {
    this.props.history.push({ pathname: `/admin/potd/edit/${this.props.potd.id}` })
  }

  render () {
    const { potd } = this.props

    return (
      <Card
        wrapperStyle={{
          padding: '15px 20px',
          display: 'flex'
        }}
        style={{
          marginBottom: '15px',
          marginTop: 0,
          position: 'relative'
        }}
      >
        <p styleName='title'>{potd.title}</p>

        <ul styleName='actions'>
          <li>
            <div
              styleName='icon-wrapper'
              data-tip-for={`potd-edit-${potd.id}`}
              onClick={this.navigateToEdit}
            >
              <EditPencil />
              <Tooltip id={`potd-edit-${potd.id}`} pos='top'>
                Edit
              </Tooltip>
            </div>
          </li>

          <li>
            <div
              styleName='icon-wrapper'
              onClick={this.togglePublishModal}
              data-tip-for={`potd-publish-${potd.id}`}
            >
              <PublishIcon />
              <Tooltip id={`potd-publish-${potd.id}`} pos='top'>
                Publish
              </Tooltip>
            </div>
          </li>

          <li>
            <div
              styleName='icon-wrapper'
              onClick={this.toggleDeleteModal}
              data-tip-for={`potd-delete-${potd.id}`}
            >
              <RemoveIcon />
              <Tooltip id={`potd-delete-${potd.id}`} pos='top'>
                Delete
              </Tooltip>
            </div>
          </li>
        </ul>

        <DeletePickOfTheDay
          isOpen={this.state.showDeleteModal}
          toggle={this.toggleDeleteModal}
          potd={potd}
        />

        <PublishPickOfTheDay
          isOpen={this.state.showPublishModal}
          toggle={this.togglePublishModal}
          potd={potd}
        />
      </Card>
    )
  }
}

PickOfTheDayItem.propTypes = {
  potd: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(PickOfTheDayItem)
