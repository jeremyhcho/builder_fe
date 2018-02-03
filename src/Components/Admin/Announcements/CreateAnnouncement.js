import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Actions
import { createAnnouncement } from 'Actions'

// Components
import { Button, Input, Card, DocumentTitle } from 'Components/Common'

// Icons
import LeftArrow from 'Assets/Icons/left-arrow.svg'

// CSS
import './Announcements.scss'

class CreateAnnouncement extends React.Component {
  state = {
    title: 'Official Alpha Begins!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' +
          'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ' +
          'veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
          'ea commodo consequat. Duis aute irure dolor in reprehenderit in ' +
          'voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui ' +
          'officia deserunt mollit anim id est laborum.',
    showPreview: false
  }

  createAnnouncement = () => {
    const { title, body } = this.state

    this.props.createAnnouncement({
      title,
      body
    })
  }

  handleBodyChange = (body) => {
    this.setState({ body })
  }

  handleChange = (field) => {
    return (e) => this.setState({ [field]: e.target.value })
  }

  togglePreview = () => {
    this.setState({ showPreview: !this.state.showPreview })
  }

  renderForm () {
    const { title, body } = this.state

    return (
      <div>
        <Input
          type='text'
          placeholder='Official Alpha Begins'
          value={title}
          onChange={this.handleChange('title')}
          label='Title'
          shouldFitContainer
        />

        <p style={{ marginTop: '30px', marginBottom: '5px' }}>Body</p>
        <ReactQuill
          value={body}
          onChange={this.handleBodyChange}
        />

        <Button
          primary
          onClick={this.togglePreview}
          shouldFitContainer
          style={{ marginTop: '30px' }}
        >
          Preview announcement
        </Button>
      </div>
    )
  }

  renderPreview () {
    const { title, body } = this.state
    /* eslint-disable react/no-danger */
    return (
      <div>
        <Button secondary onClick={this.togglePreview} style={{ marginBottom: '45px' }}>
          <LeftArrow width={9} height={9} style={{ marginRight: '5px' }} />Edit
        </Button>

        <p className='label small'>{moment().format('dddd, MMMM Mo')}</p>
        <h3 className='semibold' style={{ marginTop: '8px' }}>{title}</h3>
        <div
          style={{ marginTop: '30px' }}
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <Button
          primary
          shouldFitContainer
          onClick={this.createAnnouncement}
          style={{ marginTop: '30px' }}
          loading={this.props.creatingAnnouncement}
        >
          Create announcement
        </Button>
      </div>
    )
    /* eslint-enable react/no-danger */
  }

  render () {
    return (
      <DocumentTitle
        title='Quartz - Announcements'
        header='New Announcement'
        backUrl='/admin/announcements'
      >
        <div styleName='create-announcements-container'>
          <Card wrapperStyle={{ padding: '45px 30px' }}>
            {this.state.showPreview && this.renderPreview()}
            {!this.state.showPreview && this.renderForm()}
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

CreateAnnouncement.defaultProps = {
  creatingAnnouncement: false
}

CreateAnnouncement.propTypes = {
  createAnnouncement: PropTypes.func.isRequired,
  creatingAnnouncement: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  creatingAnnouncement: routines.callingApi.CREATE_ANNOUNCEMENT
})

const mapDispatchToProps = {
  createAnnouncement
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAnnouncement)
