import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Icons
import AnalyticsIcon from 'Assets/Icons/landingPage/blue-analytics.svg'
import ChartIcon from 'Assets/Icons/landingPage/blue-bar-chart.svg'
import ModelIcon from 'Assets/Icons/landingPage/blue-model-sm.svg'
import NBAIcon from 'Assets/Icons/landingPage/blue-basketball.svg'
import NFLIcon from 'Assets/Icons/landingPage/blue-football.svg'
import MLBIcon from 'Assets/Icons/landingPage/blue-baseball.svg'

// CSS
import './LandingPage.scss'

const Features = () => {
  const features = [
    {
      icon: ModelIcon,
      title: 'Models',
      description: 'Customize your own models using...'
    },
    {
      icon: ChartIcon,
      title: 'Graphs',
      description: 'Graphs that help you analyze trends and statistics'
    },
    {
      icon: AnalyticsIcon,
      title: 'Compare',
      description: 'Compare your models with others'
    },
    {
      icon: NBAIcon,
      title: 'NBA',
      description: 'Full library of NBA games and statistics'
    },
    {
      icon: MLBIcon,
      title: 'MLB',
      description: 'Coming soon...'
    },
    {
      icon: NFLIcon,
      title: 'NFL',
      description: 'Coming soon...'
    }
  ]

  return (
    <section styleName="features">
      <Row styleName="col-1000">
        {
          features.map(({ icon: Icon, title, description }) => (
            <Col xs={4} styleName="feature" key={title}>
              <div styleName="left">
                <Icon height={28} width={28} />
              </div>

              <div styleName="right">
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </Col>
          ))
        }
      </Row>
    </section>
  )
}

export default Features
