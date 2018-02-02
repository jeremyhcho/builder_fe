/* eslint-disable no-underscore-dangle */
const modelValidate = (values) => {
  const errors = {}
  if (!values.type) {
    errors.type = 'You must choose a model type'
  }

  if (values.specs) {
    const specsTotal = Object.values(values.specs)
      .reduce((total, val) => parseInt(total, 10) + parseInt(val, 10))

    if (specsTotal !== 50) {
      const specErrors = {}
      specErrors.field_goals_made = 'ERROR MESSAGE'
      errors.specs = specErrors
    }
  }
  /* eslint-enable no-underscore-dangle */
  return errors
}

export default modelValidate
