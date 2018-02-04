import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// CSS
import './Announcements.scss'

const AnnouncementItem = ({ announcement }) => (
  /* eslint-disable react/no-danger */
  <div styleName='announcement'>
    <p className='label small'>
      {moment(announcement.published_date).format('dddd, MMMM Mo')}
    </p>

    <h3 className='semibold' style={{ marginTop: '8px' }}>{announcement.title}</h3>

    <div
      style={{ marginTop: '30px' }}
      dangerouslySetInnerHTML={{ __html: announcement.body }}
    />
  </div>
  /* eslint-enable react/no-danger */
)

AnnouncementItem.propTypes = {
  announcement: PropTypes.object.isRequired
}

export default AnnouncementItem
