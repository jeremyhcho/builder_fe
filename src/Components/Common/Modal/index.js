import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Modal.scss'

class Modal extends React.Component {
  state = {
    isOpen: this.props.isOpen,
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: newProps.isOpen })
    }
  }

  render () {
    const { header, onClose, children } = this.props
    const modalStyle = classNames('modal', {
      isOpen: this.state.isOpen
    })
    return (
      <div styleName={modalStyle}>
        <div styleName="modal-content">
          <div styleName="header">
            <h1 styleName="title">{header}</h1>
            <button type="button" styleName="exit-button" onClick={onClose}>
              <i className="fa fa-times" aria-hidden="true" />
            </button>
          </div>
          <div styleName="body">
            {children}
          </div>
          <div styleName="footer">
            Footer
          </div>
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  header: '',
  children: null,
}

Modal.propTypes = {
  header: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Modal
