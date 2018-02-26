import React from 'react'

// Components
import { InfoBubble } from 'Components/Common'

const SpreadPredictionInfo = () => (
  <InfoBubble pos="right" width={400}>
    <p className='label' style={{ textAlign: 'left' }}>WHAT IS THIS?</p>

    <p style={{ marginTop: '10px', textAlign: 'left' }}>
      This graph aggregates the active predictions for this game across existing
      Quartz models and finds the best fit line between a model's win percent
      and the predicted spread.
    </p>
  </InfoBubble>
)

export default SpreadPredictionInfo
