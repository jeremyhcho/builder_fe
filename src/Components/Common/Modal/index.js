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

  handleOutsideClicks = (e) => {
    if (!this.content.contains(e.target) && this.state.isOpen) {
      this.props.toggle()
    }
  }

  render () {
    const {
      header,
      toggle,
      children,
      footer,
      // isOpen,
      wrapperStyle,
      modal,
      height
      // ...props
    } = this.props
    const modalStyle = classNames('modal', {
      isOpen: this.state.isOpen
    })
    return (
      <div
        styleName={modalStyle}
        onClick={modal ? null : this.handleOutsideClicks}
      >
        <div styleName="modal-container" style={wrapperStyle} ref={ref => this.content = ref}>
          <div styleName="header">
            <h1 className='semibold' styleName="title">{header}</h1>
            <button
              type="button"
              styleName="exit-button"
              onClick={toggle}
            >
              <i
                className="fa fa-times"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '9px',
                  left: '10.5px',
                  fontSize: '18px'
                }}
              />
            </button>
          </div>
          <div styleName="body" style={{ height }}>
            {children}
          </div>

          <div styleName="footer">
            {footer}
          </div>
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  header: '',
  children: null,
  footer: [],
  wrapperStyle: {},
  modal: true,
  height: null
}

Modal.propTypes = {
  header: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  footer: PropTypes.array,
  wrapperStyle: PropTypes.object,
  modal: PropTypes.bool,
  height: PropTypes.number
  /* Forces user to use one of the actions in the modal,
  clicking outside the modal will not trigger the state of the modal */
}

export default Modal
