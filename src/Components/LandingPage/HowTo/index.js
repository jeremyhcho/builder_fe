import React from 'react'

// Icons
import ModelIcon from 'Assets/Icons/landingPage/blue-model.svg'
import PodiumIcon from 'Assets/Icons/landingPage/blue-podium-trophy.svg'
import SpaceshipIcon from 'Assets/Icons/landingPage/blue-spaceship.svg'

// CSS
import './HowTo.scss'

const HowTo = () => {
  return (
    <section styleName="how-to">
      <div styleName="col-1000">
        <div styleName="image-2">
          <img
            src="https://s3-us-west-1.amazonaws.com/builder-api/data_exports/assets/macbook_pro.jpg"
            style={{
              height: '100%',
              width: '100%',
              marginBottom: '20px'
            }}
          />
        </div>

        <div styleName="info-1">
          <ModelIcon height={80} width={80} />
          <p>Create models</p>
        </div>

        <div styleName="info-1">
          <SpaceshipIcon height={80} width={80} />
          <p>Generate predictions</p>
        </div>

        <div md={4} xs={12} styleName="info-2">
          <PodiumIcon height={80} width={80} />
          <p>Improve your bets</p>
        </div>
      </div>
    </section>
  )
}

export default HowTo
