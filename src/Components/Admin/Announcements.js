import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Actions
import { verifyAdmin } from 'Actions'

class Announcements extends React.Component {
  state = {
    text: ''
  }

  componentDidMount () {
    this.props.verifyAdmin()
  }

  componentWillReceiveProps (newProps) {
    const { isAdmin, confirmed } = newProps

    if (!isAdmin && confirmed) {
      this.props.history.push({ pathname: '/' })
    }
  }

  handleChange = (text) => {
    this.setState({ text })
  }

  render () {
    const { isAdmin, confirmed } = this.props

    if (!isAdmin && !confirmed) {
      return <div />
    }

    return (
      <div>
        <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

Announcements.propTypes = {
  verifyAdmin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  confirmed: PropTypes.bool.isRequired
}

const mapStateToProps = ({ admin }) => ({
  isAdmin: admin.authState.isAdmin,
  confirmed: admin.authState.confirmed
})

const mapDispatchToProps = {
  verifyAdmin
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Announcements)
