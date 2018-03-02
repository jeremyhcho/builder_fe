import React from 'react'
import PropTypes from 'prop-types'

// Components
import DelayedLoader from './DelayedLoader'

/*
  ** timedOut: true when loading gets past -default- 10000 (ms)
  ** pastDelay: true when still loading after delay -default- 200 (ms)
  ** error: true if loading fails
*/

const Loading = ({ timedOut, pastDelay, error }) => {
  if (error) {
    return <div />
  } else if (pastDelay) {
    return <DelayedLoader />
  } else if (timedOut) {
    return <div />
  }

  return <div />
}

Loading.defaultProps = {
  timedOut: null,
  pastDelay: null,
  error: null
}

Loading.propTypes = {
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.bool
}

export default Loading
