import React from 'react'
import PropTypes from 'prop-types'

/*
  ** timedOut: when loading takes forever - 10000 (ms)
  ** pastDelay: load after delay - 200 (ms)
  ** error: load if loading fails
*/

const Loading = ({ timedOut, pastDelay, error }) => {
  if (error) {
    return <div />
  } else if (pastDelay) {
    return <div />
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
