import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import moment from 'moment'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Actions
import { updatePickOfTheDay, fetchPickOfTheDay } from 'Actions'

// Components
import { Card, DocumentTitle } from 'Components/Common'

// CSS
import './PickOfTheDay.scss'

class EditPickOfTheDay extends React.Component {
  state = {
    title: '',
    body: '',
    showPreview: false
  }

  componentDidMount () {
    this.props.fetchPickOfTheDay(this.props.match.params.id)
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
          placeholder='Pick of the Day'
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
          Preview Pick of the Day
        </Button>
      </div>
    )
  }

  renderPreview () {
    const { title, body } = this.state
    /* eslint-disable react/no-danger */
    return (
      <div>
        <Button
          secondary
          onClick={this.togglePreview}
          style={{ marginBottom: '45px' }}
        >
          <LeftArrow
            width={9}
            height={9}
            style={{ marginRight: '5px' }}
          />
          Edit
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
          onClick={this.updatePickOfTheDay}
          style={{ marginTop: '30px' }}
          loading={this.props.updatingPickOfTheDay}
        >
          Update Pick of the Day
        </Button>
      </div>
    )
    /* eslint-enable react/no-danger */
  }

  render () {
    return (
      <DocumentTitle
        title='Quartz - Pick of the Day'
        header='Edit Pick of the Day'
        backUrl='/admin/potd'
      >
        <div styleName='create-potd-container'>
          <Card wrapperStyle={{ padding: '45px 30px' }}>
            {this.state.showPreview && this.renderPreview()}
            {!this.state.showPreview && this.renderForm()}
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

EditPickOfTheDay.defaultProps = {
  updatingPickOfTheDay: false,
  potd: {}
}

EditPickOfTheDay.propTypes = {
  fetchPickOfTheDay: PropTypes.func.isRequired,
  updatePickOfTheDay: PropTypes.func.isRequired,
  updatingPickOfTheDay: PropTypes.bool,
  match: PropTypes.object.isRequired,
  potd: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  updatingPickOfTheDay: routines.callingApi.UPDATE_PICK_OF_THE_DAY,
  potd: routines.admin.fetchPickOfTheDay
})

const mapDispatchToProps = {
  fetchPickOfTheDay,
  updatePickOfTheDay
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPickOfTheDay)
