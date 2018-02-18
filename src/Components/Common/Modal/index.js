import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Modal.scss'

class Modal extends React.Component {
  state = {
    isOpen: this.props.isOpen,
  }

  componentDidMount () {
    this.content.focus()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: newProps.isOpen })

      if (newProps.isOpen) {
        console.log('add event listener')
        document.addEventListener('keydown', this.handleEsc, false)
      }
    }
  }

  closeModal () {
    console.log('remove event listener')
    document.removeEventListener('keydown', this.handleEsc, false)

    this.props.toggle()
  }

  handleEsc = (e) => {
    if (e.keyCode === 27) {
      this.closeModal()
    }
  }

  handleOutsideClicks = (e) => {
    if (!this.content.contains(e.target) && this.state.isOpen) {
      this.closeModal()
    }
  }

  render () {
    const {
      header,
      children,
      footer,
      // isOpen,
      modal,
      headerIcon: HeaderIcon,
      wrapperStyle,
      bodyStyle,
      footerStyle
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
        <div
          styleName="modal-container"
          style={wrapperStyle}
          ref={ref => this.content = ref}
          tabIndex="0"
        >
          <div styleName="header">
            <div className="flex">
              {
                HeaderIcon ? (
                  <HeaderIcon width={25} height={25} style={{ marginRight: '15px' }} />
                ) : null
              }
              <h1 className='semibold' styleName="title">{header}</h1>
            </div>
            <button
              type="button"
              styleName="exit-button"
              onClick={() => this.closeModal()}
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

          <div styleName="body" style={{ ...bodyStyle }}>
            {children}
          </div>

          {
            footer.length ? (
              <div styleName="footer" style={{ ...footerStyle }}>
                {footer}
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  header: '',
  headerIcon: null,
  children: null,
  footer: [],
  modal: true,
  wrapperStyle: {},
  bodyStyle: {},
  footerStyle: {}
}

Modal.propTypes = {
  header: PropTypes.string,
  headerIcon: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  footer: PropTypes.array,
  modal: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  footerStyle: PropTypes.object
  /* Forces user to use one of the actions in the modal,
  clicking outside the modal will not trigger the state of the modal */
}

export default Modal
