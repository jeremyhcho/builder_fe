import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Icons
import AnalyticsIcon from 'Assets/Icons/landingPage/blue-analytics.svg'
import ChartIcon from 'Assets/Icons/landingPage/blue-bar-chart.svg'
import ModelIcon from 'Assets/Icons/landingPage/blue-model-sm.svg'
import NBAIcon from 'Assets/Icons/landingPage/blue-basket.svg'
import NFLIcon from 'Assets/Icons/landingPage/blue-football.svg'
import MLBIcon from 'Assets/Icons/landingPage/blue-baseball-cap.svg'

// CSS
import './Features.scss'

const Features = () => {
  const features = [
    {
      icon: ModelIcon,
      title: 'Models',
      description: 'Create your own models'
    },
    {
      icon: ChartIcon,
      title: 'Graphs',
      description: 'Analyze trends and statistics'
    },
    {
      icon: AnalyticsIcon,
      title: 'Compare',
      description: 'Compare your models with others'
    },
    {
      icon: NBAIcon,
      title: 'NBA',
      description: 'Full library of NBA games and stats'
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
            <Col lg={4} sm={6} xs={12} styleName="feature" key={title}>
              <div styleName="left">
                <Icon width={28} height={28} />
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
