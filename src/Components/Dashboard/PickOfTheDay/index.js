import React from 'react'

// Components
import { Card } from 'Components/Common'

// Assets
import FireRed from 'Assets/Icons/fire-red.svg'

const PickOfTheDay = () => (
  <Card label='Pick of the Day' style={{ margin: 0 }} wrapperStyle={{ padding: '40px' }}>
    <FireRed
      width={70}
      height={70}
      style={{
        display: 'block',
        margin: '0 auto'
      }}
    />
    <h2 style={{ textAlign: 'center', marginTop: '15px' }}>
      COMING SOON
    </h2>
  </Card>
)

export default PickOfTheDay
