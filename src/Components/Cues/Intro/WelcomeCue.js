import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Modal, Button } from 'Components/Common'

// Icons
import QuzeIcon from 'Assets/Icons/blue-q-1.svg'

const WelcomeCue = ({ welcomeCue }) => (
  <Modal
    isOpen={welcomeCue}
    wrapperStyle={{ width: '55%' }}
    bodyStyle={{
      padding: '40px 25px',
      textAlign: 'center'
    }}
    footer={[
      <Button
        secondary
        key='submit'
      >
        <p className="semibold">Get Started!</p>
      </Button>
    ]}
  >
    <QuzeIcon height={100} width={100} style={{ marginBottom: '25px' }} />
    <h1 className="semibold" style={{ marginBottom: '25px' }}>Hey there!</h1>

    <p style={{ textAlign: 'left', lineHeight: '20px' }}>
      Quze is a tool to help you build simple sports models. Models automatically
      {' '} generate predictions according to your input and keeps track of its own performance.
      {' '} Drop us a line if you have any questions or concerns at {' '}
      <a
        style={{ color: 'var(--blue)' }}
        href='mailto:support@quze.io'
      >
        support@quze.io
      </a>
      {' '} or click on the button below to get started.
    </p>
  </Modal>
)

WelcomeCue.propTypes = {
  welcomeCue: PropTypes.bool.isRequired
}

const mapStateToProps = ({ cues }) => ({
  welcomeCue: cues.intro.welcomeModal
})

export default connect(
  mapStateToProps
)(WelcomeCue)
