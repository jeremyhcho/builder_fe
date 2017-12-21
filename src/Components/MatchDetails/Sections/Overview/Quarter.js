import React from 'react'

// Components
import { Card, Button } from 'Components/Common'

class Quarter extends React.Component {
  state = {
    quarter: 'Q1'
  }

  render () {
    return (
      <div>
        <Card label="Quarter" wrapperStyle={{ padding: '50px 25px' }}>
          <div>
            <Button flat>Q1</Button>
            <Button flat>Q2</Button>
            <Button flat>Q3</Button>
            <Button flat>Q4</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default Quarter
