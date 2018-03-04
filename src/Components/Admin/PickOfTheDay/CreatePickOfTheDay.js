import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Actions
import { createPickOfTheDay, fetchPickOfTheDays } from 'Actions'

// Components
import { Button, Input, Card, DocumentTitle } from 'Components/Common'

// Icons
import LeftArrow from 'Assets/Icons/left-arrow.svg'

// CSS
import './PickOfTheDay.scss'

class CreatePickOfTheDay extends React.Component {
  state = {
    title: '',
    body: '',
    showPreview: false
  }

  componentDidMount () {
    if (!this.props.potd) this.props.fetchPickOfTheDays()
  }

  createPickOfTheDay = () => {
    const { title, body } = this.state

    this.props.createPickOfTheDay({
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
          placeholder='Pick of the Day'
          value={title}
          onChange={this.handleChange('title')}
          label='Title'
          shouldFitContainer
        />

        <p style={{ marginTop: '30px', marginBottom: '5px' }}>Body</p>

        <div style={{ height: '500px' }}>
          <ReactQuill
            value={body}
            onChange={this.handleBodyChange}
            style={{ height: '100%' }}
            modules={{
              toolbar: [
                { size: ['small', 'medium', 'large', 'huge'] },
                'bold',
                'italic',
                'underline',
                'strike',
                { list: 'ordered' },
                { list: 'bullet' },
                'blockquote',
                'align',
                'image',
                'link',
                { color: [] }
              ]
            }}
          />
        </div>

        <Button
          primary
          onClick={this.togglePreview}
          shouldFitContainer
          style={{ marginTop: '70px' }}
        >
          Preview Pick Of The Day
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

        <p className='label small'>{moment().format('dddd, MMM Mo')}</p>
        <h3 className='semibold' style={{ marginTop: '8px' }}>{title}</h3>
        <div
          styleName='preview'
          style={{ marginTop: '30px' }}
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <Button
          primary
          shouldFitContainer
          onClick={this.createPickOfTheDay}
          style={{ marginTop: '70px' }}
          loading={this.props.creatingPickOfTheDay}
        >
          Create pick of the day
        </Button>
      </div>
    )
  }

  render () {
    return (
      <DocumentTitle
        title='Quartz - Pick of the Day'
        header='New Pick of the Day'
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

CreatePickOfTheDay.defaultProps = {
  creatingPickOfTheDay: false,
  potd: null
}

CreatePickOfTheDay.propTypes = {
  createPickOfTheDay: PropTypes.func.isRequired,
  fetchPickOfTheDays: PropTypes.func.isRequired,
  creatingPickOfTheDay: PropTypes.bool,
  potd: PropTypes.array
}

const mapStateToProps = ({ routines }) => ({
  creatingPickOfTheDay: routines.isLoading.CREATE_PICK_OF_THE_DAY,
  potd: routines.admin.pickOfTheDays
})

const mapDispatchToProps = {
  createPickOfTheDay,
  fetchPickOfTheDays
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePickOfTheDay)
