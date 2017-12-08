import React from 'react'

// Components
import Tooltip from 'Components/Common/Tooltip'

// CSS
import './Tooltips.scss'

const Tooltips = () => (
  <div styleName='tooltips'>
    <div className='flex'>
      <p data-tip-for='top'>Top</p>
      <Tooltip id='top' pos='top'>Top</Tooltip>
    </div>

    <div className='flex'>
      <p data-tip-for='left'>Left</p>
      <Tooltip id='left' pos='left'>Left</Tooltip>
    </div>

    <div className='flex'>
      <p data-tip-for='bottom'>Bottom</p>
      <Tooltip id='bottom' pos='bottom'>Bottom</Tooltip>
    </div>

    <div className='flex'>
      <p data-tip-for='right'>Right</p>
      <Tooltip id='right' pos='right'>Right</Tooltip>
    </div>
  </div>
)

export default Tooltips
