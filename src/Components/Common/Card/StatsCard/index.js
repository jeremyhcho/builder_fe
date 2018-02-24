import React from 'react'
import PropTypes from 'prop-types'

import './StatsCard.scss'

const StatsCard = ({ title, labels, values, uniqueKey, style }) => (
  /* eslint-disable react/no-array-index-key */
  <div style={{ marginTop: '35px', height: '100%', ...style }}>
    <p className="semibold" style={{ margin: '0 10px 5px' }}>{title}</p>

    <div styleName='stats-card'>
      <div styleName="row labels">
        {
          labels.map((label, i) => {
            if (i !== 0) {
              return (
                <div
                  className="small"
                  styleName="col"
                  style={{ textAlign: 'center' }}
                  key={label}
                >
                  <p>{label}</p>
                </div>
              )
            }

            return (
              <div styleName="col" key={label}>
                <p className="label small">{label}</p>
              </div>
            )
          })
        }
      </div>

      <div styleName="values">
        {
          values.map((valueArray, primaryIndex) => (
            <div styleName="row" key={`${uniqueKey}-${primaryIndex}`}>
              {
                valueArray.map((value, secondaryIndex) => {
                  if (secondaryIndex !== 0) {
                    return (
                      <div
                        styleName="col"
                        style={{ textAlign: 'center' }}
                        key={`${uniqueKey}-${primaryIndex}-${secondaryIndex}`}
                      >
                        <div styleName="value">
                          {value}
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div
                      styleName="col"
                      key={`${uniqueKey}-${primaryIndex}-${secondaryIndex}`}
                    >
                      <div>
                        {value}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </div>
    </div>
  </div>
)

StatsCard.defaultProps = {
  title: '',
  values: [],
  style: {}
}

StatsCard.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.array.isRequired,
  values: (props, propName, componentName) => {
    if (!props[propName].every(valueArray => (
      valueArray.length === props.labels.length
    ))) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation Failed`
      )
    }

    return null
  },
  uniqueKey: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default StatsCard
