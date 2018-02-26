import React from 'react'

// Components
import { InfoBubble } from 'Components/Common'

const PredictionsInfo = () => (
  <InfoBubble pos="right" width={400}>
    <p className='label' style={{ textAlign: 'left' }}>WHAT IS THIS?</p>

    <p style={{ textAlign: 'left', marginTop: '10px' }}>
      The "Prediction" block shows the raw prediction made by the model selected
      above. The three columns indicate the following:
    </p>

    <p style={{ textAlign: 'left', marginTop: '20px' }}>
      <span className='semibold'>VEGAS:</span> The closing line of the game.
    </p>

    <p style={{ textAlign: 'left', marginTop: '5px' }}>
      <span className='semibold'>PREDICTED SPREAD:</span> The spread prediction of your model.
    </p>

    <p style={{ textAlign: 'left', marginTop: '5px' }}>
      <span className='semibold'>PREDICTION VALUE:</span> The amount of padded
      points tailing this prediction has against the Vegas line. A positive number
      denotes a "good" value for taking the Vegas line.
    </p>
  </InfoBubble>
)

export default PredictionsInfo
