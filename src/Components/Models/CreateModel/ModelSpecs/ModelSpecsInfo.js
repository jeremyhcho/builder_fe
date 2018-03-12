import React from 'react'

// Components
import { InfoBubble } from 'Components/Common'

const ModelSpecsInfo = () => (
  <InfoBubble pos="right" width={500}>
    <p className='label' style={{ textAlign: 'left' }}>WHAT DOES THIS DO?</p>

    <p style={{ marginTop: '10px', textAlign: 'left' }}>
      Quze models allow you to assign weights onto crucial stats that are used to
      create predictions. A higher value indicates a greater importance of the specific
      metric in your model. A combination of different values will generate different predictions.
    </p>
  </InfoBubble>
)

export default ModelSpecsInfo
