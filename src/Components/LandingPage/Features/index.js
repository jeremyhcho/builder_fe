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
      title: 'Customize',
      description: 'Adjust the prioritized metrics on your models and ' +
                   'find the model that works for you.'
    },
    {
      icon: ChartIcon,
      title: 'Insights',
      description: 'How well does a team do after a loss? Per quarter? ' +
                   'We pull the insights you need to succeed.'
    },
    {
      icon: StockIcon,
      title: 'Compare',
      description: 'Quartz aggregates models and matches correlated data to ' +
                   '"crowd source" predictions through the app.'
    },
    {
      icon: NBAIcon,
      title: 'Automation',
      description: 'Manually adjusting data is tedious. Predictions are automated and ensures' +
                   ' that they stay on top of the news.'
    },
    {
      icon: MLBIcon,
      title: 'Seamless',
      description: 'Forget spreadsheets, forget manual data entry. Find where the value' +
                   ' is with a few clicks of your mouse.'
    },
    {
      icon: NFLIcon,
      title: 'Successful',
      description: 'We\'re constantly improving our internal model and finding edges for you. ' +
                   'Let us help you start winning today!'
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
                <h2 style={{ fontWeight: '600' }}>{title.toUpperCase()}</h2>
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
