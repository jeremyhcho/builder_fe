import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Spinner } from 'Components/Common'

// Actions
import { fetchNBASummary } from 'Actions'

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
            <Card label="Summary" wrapperStyle={{ padding: '50px 25px' }}>
              <Row middle='xs'>
                <Col xs={4} style={{ textAlign: 'right' }}>
                  <p className="semibold label">{summary.away_team.city}</p>
                  <p className="semibold">{summary.away_team.name}</p>
                </Col>

                <Col xs={2}>
                  <h1 className="bold">{summary.away_team.points}</h1>
                </Col>

                <Col xs={2} style={{ textAlign: 'right' }}>
                  <h1 className="bold">{summary.home_team.points}</h1>
                </Col>

                <Col xs={4} reverse>
                  <p className="semibold label">{summary.home_team.city}</p>
                  <p className="semibold">{summary.home_team.name}</p>
                </Col>
              </Row>
            </Card>
          ) : (
            <Card label="Summary" wrapperStyle={{ padding: '50px 25px' }}>
              <Row center='xs' middle='xs'>
                <Col xs={12}>
                  <Spinner lg show />
                </Col>
              </Row>
            </Card>
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
