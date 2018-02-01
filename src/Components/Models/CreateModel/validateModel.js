const validateModel = values => {
  const errors = {}
  if (!values.type) {
    errors.type = 'You must choose a model type'
  }

  return errors
}

export default validateModel
