import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { fetchPickOfTheDays } from 'Actions'

// Components
import PickOfTheDayItem from './PickOfTheDayItem'
import { Button, DocumentTitle } from 'Components/Common'

// Icons
import PlusIcon from 'Assets/Icons/plus.svg'

// CSS
import './PickOfTheDay.scss'

class PickOfTheDay extends React.Component {
  componentDidMount () {
    this.props.fetchPickOfTheDays()
  }

  navigateToCreate = () => {
    this.props.history.push({ pathname: '/admin/potd/new' })
  }

  unpublishedPickOfTheDays () {
    return this.props.pickOfTheDays.filter(potd => !potd.is_published)
  }

  publishedPickOfTheDays () {
    return this.props.pickOfTheDays.filter(potd => potd.is_published)
  }

  renderUnpublishedPickOfTheDays = () => {
    const unpublishedPickOfTheDays = this.unpublishedPickOfTheDays()

    if (!unpublishedPickOfTheDays.length) return null

    return (
      <div>
        <p className='semibold' style={{ marginBottom: '5px' }}>Draft</p>
        {
          unpublishedPickOfTheDays.map(potd => (
            <PickOfTheDayItem
              potd={potd}
              key={potd.id}
            />
          ))
        }

      </div>
    )
  }

  renderPublishedPickOfTheDays = () => {
    const publishedPickOfTheDays = this.publishedPickOfTheDays()

    if (!publishedPickOfTheDays.length) return null

    return (
      <div>
        <p className='semibold' style={{ marginBottom: '5px' }}>Published</p>
        {
          publishedPickOfTheDays.map(potd => (
            <PickOfTheDayItem
              potd={potd}
              key={potd.id}
            />
          ))
        }
      </div>
    )
  }

  render () {
    return (
      <DocumentTitle title='Quze - Admin' header='Pick of the Days'>
        <div styleName='potd-container'>
          <Button
            primary
            onClick={this.navigateToCreate}
            style={{
              position: 'relative',
              marginBottom: '30px'
            }}
          >
            <PlusIcon
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <span style={{ marginLeft: '20px' }}>Create Pick of the Day</span>
          </Button>

          {this.renderUnpublishedPickOfTheDays()}
          {this.renderPublishedPickOfTheDays()}
        </div>
      </DocumentTitle>
    )
  }
}

PickOfTheDay.defaultProps = {
  pickOfTheDays: []
}

PickOfTheDay.propTypes = {
  pickOfTheDays: PropTypes.array,
  fetchPickOfTheDays: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines }) => ({
  pickOfTheDays: routines.admin.pickOfTheDays
})

const mapDispatchToProps = {
  fetchPickOfTheDays
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickOfTheDay)
