import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Actions
import { updatePickOfTheDay, fetchPickOfTheDay, fetchPickOfTheDays } from 'Actions'

// Components
import { Button, Input, Card, DocumentTitle } from 'Components/Common'


// Icons
import LeftArrow from 'Assets/Icons/left-arrow.svg'

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

    if (!this.props.potds) this.props.fetchPickOfTheDays()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.potd.id && !this.state.title && !this.state.body) {
      this.setState({
        title: newProps.potd.title,
        body: newProps.potd.body
      })
    }

    if (!newProps.updatingPickOfTheDay && this.props.updatingPickOfTheDay) {
      this.props.history.push({ pathname: '/admin/potd', state: { from: `/admin/potd/edit/${this.props.potd.id}` } })
    }
  }

  updatePickOfTheDay = () => {
    const { title, body } = this.state

    this.props.updatePickOfTheDay(this.props.potd.id, {
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
    if (!Object.keys(this.props.potd).length || !this.props.potds) {
      return <div />
    }

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
  potd: {},
  potds: null
}

EditPickOfTheDay.propTypes = {
  fetchPickOfTheDay: PropTypes.func.isRequired,
  fetchPickOfTheDays: PropTypes.func.isRequired,
  updatePickOfTheDay: PropTypes.func.isRequired,
  updatingPickOfTheDay: PropTypes.bool,
  match: PropTypes.object.isRequired,
  potd: PropTypes.object,
  potds: PropTypes.array,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines }) => ({
  updatingPickOfTheDay: routines.callingApi.UPDATE_PICK_OF_THE_DAY,
  potd: routines.admin.pickOfTheDay,
  potds: routines.admin.pickOfTheDays
})

const mapDispatchToProps = {
  fetchPickOfTheDay,
  fetchPickOfTheDays,
  updatePickOfTheDay
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPickOfTheDay)
