import React from 'react'

// Icons
import StockIcon from 'Assets/Icons/landingPage/bb-stock.svg'
import ChartIcon from 'Assets/Icons/landingPage/bb-chart.svg'
import ModelIcon from 'Assets/Icons/landingPage/bb-model.svg'
import NBAIcon from 'Assets/Icons/landingPage/bb-basketball.svg'
import NFLIcon from 'Assets/Icons/landingPage/bb-football.svg'
import MLBIcon from 'Assets/Icons/landingPage/bb-baseball-cap.svg'

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
      icon: StockIcon,
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
      <div styleName="col-1000">
        {
          features.map(({ icon: Icon, title, description }) => (
            <section styleName="feature" key={title}>
              <div styleName="left">
                <Icon width={28} height={28} />
              </div>

              <div styleName="right">
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </section>
          ))
        }
      </div>
    </section>
  )
}

export default Features
