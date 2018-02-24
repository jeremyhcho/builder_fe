import React from 'react'

import './StatsCard.scss'

const StatsCard = ({ title, labels, values }) => {
  return (
    <div>
      <p style={{ margin: '0 10px 5px' }}>{title}</p>

      <div styleName='stats-card'>
        <div styleName="row">
          {
            labels.map((label, i) => {
              if (i !== 0) {
                return (
                  <div styleName="col" style={{ textAlign: 'center' }}>
                    <p>{label}</p>
                  </div>
                )
              }

              return (
                <div styleName="col">
                  <p className="label">{label}</p>
                </div>
              )
            })
          }
        </div>

        <div styleName="values">
          {
            values.map(valueArray => (
              <div styleName="row">
                {
                  valueArray.map((value, i) => {
                    if (i !== 0) {
                      return (
                        <div styleName="col" style={{ textAlign: 'center' }}>
                          {value}
                        </div>
                      )
                    }

                    return (
                      <div styleName="col">
                        {value}
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
}

export default StatsCard
