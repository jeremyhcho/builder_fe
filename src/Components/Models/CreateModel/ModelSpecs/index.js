import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { formValueSelector, Field } from 'redux-form'

// Components & Icons
import { Card, FieldSlider, Button } from 'Components/Common'
import Error from 'Assets/Icons/error.svg'
import StatDetail from './StatDetail'
import ModelSpecsInfo from './ModelSpecsInfo'

// CSS
import './ModelSpecs.scss'

// Helpers
import { nbaFlatStat } from 'Helpers'
import specKeys from '../specKeys'

const selector = formValueSelector('model')
const infoTexts = {
  effective_fg_pct: {
    text: 'Effective FG % measure how successful a team is from the field.' +
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

const ModelSpecs = ({ creatingModel, updatingModel, specs }) => {
  const getSpecsDifference = (specsTotal) => {
    const requiredDifference = specsTotal - 25

    if (requiredDifference > 0) {
      return (
        <Row middle='xs'>
          <Error height={16} />

          <p style={{ color: 'var(--red)', marginLeft: '-5px' }}>
            {Math.abs(requiredDifference)} point(s) exceeded
          </p>
        </Row>
      )
    } else if (requiredDifference < 0) {
      return (
        <Row middle='xs'>
          <Error height={16} />
          <p style={{ marginLeft: '-5px' }}>{Math.abs(requiredDifference)} point(s) required</p>
        </Row>
      )
    }

    return null
  }

  const renderSubmitButton = () => {
    if (updatingModel || creatingModel) {
      return <Button loading />
    }

    return <Button type="submit">Submit</Button>
  }

  const specsTotal = Object.values(specs)
    .reduce((total, value) => parseInt(total, 10) + parseInt(value, 10))

  return (
    <Card label="Specs" style={{ width: '800px' }} subText={<ModelSpecsInfo />}>
      <div styleName="model-specs">
        <Row styleName="labels" center='xs' middle='xs'>
          <Col xs={4} style={{ textAlign: 'left' }}>
            <p className="small">STAT</p>
          </Col>

          <Col xs={8}>
            <p className="small">WEIGHT VALUE</p>
          </Col>
        </Row>

        <div styleName="values">
          {
            specKeys.map(stat => (
              <Row styleName="slider-row" key={stat} middle='xs'>
                <Col xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                  <p
                    style={{ display: 'inline-block' }}
                    className="small label"
                  >
                    {nbaFlatStat(stat).full.toUpperCase()}
                  </p>
                  <StatDetail
                    pos='top'
                    width={400}
                    text={infoTexts[stat].text}
                    impact={infoTexts[stat].impact}
                  />
                </Col>

                <Col xs={8}>
                  <Field
                    name={`specs.${stat}`}
                    component={FieldSlider}
                    min={1}
                    max={10}
                    showInputControl
                  />
                </Col>
              </Row>
            ))
          }
        </div>

        <Row middle='xs' styleName="footer" end='xs'>
          <Col>
            {getSpecsDifference(specsTotal)}
          </Col>

          <Col xs={2}>
            {renderSubmitButton()}
          </Col>
        </Row>
      </div>
    </Card>
  )
}

ModelSpecs.defaultProps = {
  specs: {},
  creatingModel: false,
  updatingModel: false
}

ModelSpecs.propTypes = {
  specs: PropTypes.object,
  creatingModel: PropTypes.bool,
  updatingModel: PropTypes.bool
}

const mapStateToProps = ({ ...state, routines }) => ({
  specs: selector(state, 'specs'),
  creatingModel: routines.isLoading.CREATE_NBA_MODEL,
  updatingModel: routines.isLoading.UPDATE_NBA_MODEL
})

export default connect(
  mapStateToProps
)(ModelSpecs)
