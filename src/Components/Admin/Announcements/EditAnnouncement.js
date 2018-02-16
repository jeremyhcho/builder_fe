import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Actions
import { updateAnnouncement, fetchAnnouncement } from 'Actions'

// Components
import { Button, Input, Card, DocumentTitle } from 'Components/Common'

// Icons
import LeftArrow from 'Assets/Icons/left-arrow.svg'

// CSS
import './Announcements.scss'

class EditAnnouncement extends React.Component {
  state = {
    title: '',
    body: '',
    showPreview: false
  }

  componentDidMount () {
    this.props.fetchAnnouncement(this.props.match.params.id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.announcement.id && !this.state.title && !this.state.body) {
      this.setState({
        title: newProps.announcement.title,
        body: newProps.announcement.body
      })
    }
  }

  updateAnnouncement = () => {
    const { title, body } = this.state

    this.props.updateAnnouncement(this.props.announcement.id, {
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
          styleName='preview'
          style={{ marginTop: '30px' }}
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <Button
          primary
          shouldFitContainer
          onClick={this.updateAnnouncement}
          style={{ marginTop: '30px' }}
          loading={this.props.updatingAnnouncement}
        >
          Update announcement
        </Button>
      </div>
    )
    /* eslint-enable react/no-danger */
  }

  render () {
    return (
      <DocumentTitle
        title='Quartz - Announcements'
        header='Edit Announcement'
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

EditAnnouncement.defaultProps = {
  updatingAnnouncement: false,
  announcement: {}
}

EditAnnouncement.propTypes = {
  updateAnnouncement: PropTypes.func.isRequired,
  updatingAnnouncement: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchAnnouncement: PropTypes.func.isRequired,
  announcement: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  updatingAnnouncement: routines.isLoading.UPDATE_ANNOUNCEMENT,
  announcement: routines.admin.fetchAnnouncement
})

const mapDispatchToProps = {
  updateAnnouncement,
  fetchAnnouncement
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAnnouncement)
