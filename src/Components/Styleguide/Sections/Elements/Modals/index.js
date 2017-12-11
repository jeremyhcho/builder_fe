import React from 'react'

// Components
import Modal from 'Components/Common/Modal'
import Button from 'Components/Common/Button'

// CSS
import './Modals.scss'

class Modals extends React.Component {
  state = {
    modalOpen: false,
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render () {
    const footerButtons = [<Button>Save Changes</Button>, <Button danger>Close</Button>]

    return (
      <div>
        <Button onClick={this.toggleModal}>
          Open Modal
        </Button>
        <Modal
          header="Modal example"
          onClose={this.toggleModal}
          isOpen={this.state.modalOpen}
          footer={footerButtons}
        />
      </div>
    )
  }
}

export default Modals
