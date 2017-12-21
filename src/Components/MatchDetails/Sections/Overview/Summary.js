import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// Actions
import { fetchNBASummary } from 'Actions'

// CSS
import './Overview.scss'

const wrapperStyle = {
  padding: '50px 25px'
}

class Summary extends React.Component {
  componentDidMount() {
    this.props.fetchNBASummary(this.props.idProp)
  }

  render () {
    const { summary } = this.props
    return (
      <div>
        {
          summary ? (
            <Card label="Summary" wrapperStyle={wrapperStyle}>
              <Row middle='xs' center='xs'>
                <div styleName='summary away'>
                  <div>
                    <p className="semibold label small">{summary.away.city}</p>
                    <h2 className="semibold">{summary.away.name.toUpperCase()}</h2>
                  </div>
                  <h1 styleName="points away" className="bold">{summary.away.points}</h1>
                </div>

                <h1 className='semibold'>@</h1>

                <div styleName='summary home'>
                  <div>
                    <p className="semibold label small">{summary.home.city}</p>
                    <h2 className="semibold">{summary.home.name.toUpperCase()}</h2>
                  </div>
                  <h1 styleName='points home' className="bold">{summary.home.points}</h1>
                </div>
              </Row>
            </Card>
          ) : (
            <OverviewSpinner label="Summary" />
          )
        }
      </div>
    )
  }
}

Summary.defaultProps = {
  summary: {}
}

Summary.propTypes = {
  summary: PropTypes.object,
  fetchNBASummary: PropTypes.func.isRequired,
  idProp: PropTypes.string.isRequired
}

const mapStateToProps = ({ matchDetails }) => ({
  summary: matchDetails.overview.summary
})

const mapDispatchToProps = {
  fetchNBASummary
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary)
