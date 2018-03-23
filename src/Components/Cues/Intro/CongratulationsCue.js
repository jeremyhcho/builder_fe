import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import { Modal, Button } from 'Components/Common'

// Icons
import ThumbsUpIcon from 'Assets/Icons/thumbs-up.svg'

// Actions
import { closeNBAIntroCue } from 'Actions'

const CongratulationsCue = ({ congratulationsCue, closeNBAIntroCue, history }) => {
  const browseGames = () => {
    closeNBAIntroCue()
    history.push({ pathname: '/games' })
  }

  return (
    <Modal
      isOpen={congratulationsCue}
      wrapperStyle={{ width: '50%' }}
      bodyStyle={{
        padding: '40px 30px',
        textAlign: 'center'
      }}
      footer={[
        <Button
          flat
          key='close'
          onClick={() => closeNBAIntroCue()}
        >
          Close
        </Button>,
        <Button
          secondary
          key='submit'
          onClick={() => browseGames()}
        >
          <p className="semibold">Browse today's games</p>
        </Button>
      ]}
    >
      <ThumbsUpIcon height={100} width={100} style={{ marginBottom: '25px' }} />
      <h1 className="semibold" style={{ marginBottom: '40px' }}>Congratulations!</h1>

      <p style={{ textAlign: 'left', lineHeight: '20px' }}>
        You've created your first model.
        {' '} Quze automatically generates predictions based on your inputs for upcoming games.
        {' '} Click the button below to view today's games
      </p>
    </Modal>
  )
}

CongratulationsCue.propTypes = {
  congratulationsCue: PropTypes.bool.isRequired,
  closeNBAIntroCue: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ cues }) => ({
  congratulationsCue: cues.intro.congratulationsModal
})

const mapDispatchToProps = {
  closeNBAIntroCue
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CongratulationsCue))
