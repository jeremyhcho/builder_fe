import React from 'react'

// Components
import Modal from 'Components/Common/Modal'
import Button from 'Components/Common/Button'
import TextArea from 'Components/Common/TextArea'
// import Input from 'Components/Common/Input'

// CSS
import './Modals.scss'

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

class Modals extends React.Component {
  state = {
    modalOpen: false,
    text: ''
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render () {
    const footerButtons = [
      <Button
        key="save"
        onClick={this.toggleModal}
      >
        Save Changes
      </Button>,
      <Button
        key="close"
        onClick={this.toggleModal}
        danger
      >
        Close
      </Button>
    ]

    return (
      <div>
        <Button onClick={this.toggleModal}>
          Open Modal
        </Button>
        <Modal
          header="Modal Title"
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          footer={footerButtons}
          wrapperStyle={{ width: '30%', textAlign: 'center' }}
        >
          <div>
            <h1 style={{ marginBottom: '5px' }}>Welcome to Quartz</h1>
            <p style={{ marginBottom: '5px' }}>{loremIpsum}</p>
            <TextArea
              label="Modal Content"
              rows={5}
              cols={40}
              placeholder="Enter text here"
              wrap="soft"
              value={this.state.text}
              onChange={(e) => this.setState({ text: e.target.value })}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Modals
