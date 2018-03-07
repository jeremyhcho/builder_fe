import React from 'react'
import PropTypes from 'prop-types'
import { getFormSyncErrors } from 'redux-form'
import { connect } from 'react-redux'

// Components
import { Slider } from 'Components/Common'
import StatDetail from './StatDetail'

// Helpers
import { nbaFlatStat } from 'Helpers'

// CSS
import './ModelSpecs.scss'

const infoTexts = {
  effective_fg_pct: {
    text: 'Effective FG % measures how successful a team is from the field.' +
          ' It adjusts the normal FG % to account for the fact that three-point' +
          ' field goals count for three points while field goals only count for two.',
    impact: 'high'
  },
  turnover_pct: {
    text: 'Turnover % measures how often a team turns the ball over. Finding the percentage' +
          ' gives a better indicator of turnovers because some teams average more possessions' +
          ' than others.',
    impact: 'medium'
  },
  oreb_pct: {
    text: 'Offensive REB % measures a team\'s ability to get offensive rebounds. Offensive' +
          ' rebounds creates second chance points and ultimately leads to more points.',
    impact: 'medium'
  },
  ft_pct: {
    text: 'Free Throw % doesn\'t measure free throws made divided by free throws attempted. Instead, ' +
          ' it awards teams for the ability to get to the line and is indicated by' +
          ' free throws made divided by field goals attempted.',
    impact: 'low'
  },
  rpm: {
    text: 'RPM or Real Plus Minus is a player assigned metric that measures an individual player\'s' +
          ' average estimated impact per 100 possessions. Quartz uses RPM to predict how player news' +
          ' will affect the outcome of the game.',
    impact: 'high'
  }
}

const SpecSliders = ({ names, fields, formErrors, ...specs }) => {
  const renderSpecsError = (requiredSpecs) => {
    if (requiredSpecs > 0) {
      return `${Math.abs(requiredSpecs)} point(s) required`
    } else if (requiredSpecs < 0) {
      return `${Math.abs(requiredSpecs)} point(s) exceeded`
    }

    return null
  }

  return (
    <div>
      {names.map(specName => {
        return (
          <div key={specName} styleName="specs-container">
            <div styleName="specs-label">
              <p className="label small">{nbaFlatStat(specName).full}</p>
              <StatDetail
                pos='top'
                width={400}
                text={infoTexts[specName].text}
                impact={infoTexts[specName].impact}
              />
            </div>

            <div styleName="specs-slider">
              <Slider
                name={specs[specName].input.name}
                value={specs[specName].input.value}
                min={1}
                max={10}
                showInputControl
                onChange={specs[specName].input.onChange}
              />
            </div>
          </div>
        )
      })}

      <p styleName="specs-error" className="small">{renderSpecsError(formErrors[names[0]])}</p>
    </div>
  )
}

SpecSliders.defaultProps = {
  fields: {},
  names: [],
}

SpecSliders.propTypes = {
  fields: PropTypes.object,
  names: PropTypes.array,
  formErrors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  formErrors: getFormSyncErrors('model')(state)
})

export default connect(
  mapStateToProps
)(SpecSliders)
