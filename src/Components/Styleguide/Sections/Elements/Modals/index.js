import React from 'react'

// Components
import Modal from 'Components/Common/Modal'
import Button from 'Components/Common/Button'
import TextArea from 'Components/Common/TextArea'

// CSS
import './Modals.scss'

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
        >
          <TextArea
            label="Modal Content"
            rows={5}
            cols={50}
            placeholder="Enter text here"
            wrap="soft"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        </Modal>
      </div>
    )
  }
}

export default Modals
