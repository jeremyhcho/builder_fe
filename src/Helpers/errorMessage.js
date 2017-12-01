const errorMessage = ({ data }) => {
  const shallowMessage = Object.values(data.messages)[0]

  if (typeof shallowMessage === 'string') {
    return shallowMessage
  }

  return shallowMessage[0]
}

export default errorMessage
