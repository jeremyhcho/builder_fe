import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Button } from 'Components/Common'
import CreateModel from './CreateModel'
import ModelCard from './ModelCard'

// CSS
import './Models.scss'

// Actions
import { fetchNBAModels } from 'Actions'

class Models extends React.Component {
  state = {
    modalOpen: false
  }

  componentWillMount () {
    this.props.fetchNBAModels()
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render () {
    const { modelList } = this.props
    return (
      <div styleName="models">
        <Row>
          <Button
            flat
            onClick={this.toggleModal}
          >
            Create Model
          </Button>
          <CreateModel toggle={this.toggleModal} isOpen={this.state.modalOpen} />
        </Row>

        <div styleName="model-list">
          <Row>
            {
              modelList.length ? (
                modelList.map(model => (
                  <Col xs={6} key={model.id}>
                    <ModelCard model={model} />
                  </Col>
                ))
              ) : (
                null
              )
            }
          </Row>
        </div>
      </div>
    )
  }
}

Models.defaultProps = {
  modelList: []
}

Models.propTypes = {
  modelList: PropTypes.array,
  fetchNBAModels: PropTypes.func.isRequired
}

const mapStateToProps = ({ nba }) => ({
  modelList: nba.models.modelList
})

const mapDispatchToProps = {
  fetchNBAModels
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Models)
