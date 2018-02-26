/* eslint-disable no-underscore-dangle */
const modelValidate = (values) => {
  const errors = {}
  if (!values.type) {
    errors.type = 'You must choose a model type'
  }

  if (values.specs) {
    const specsTotal = Object.values(values.specs)
      .reduce((total, val) => parseInt(total, 10) + parseInt(val, 10))

    if (specsTotal !== 25) {
      const specErrors = {}
      specErrors.effective_fg_pct = `${25 - specsTotal}`
      errors.specs = specErrors
    }
  }
  /* eslint-enable no-underscore-dangle */
  return errors
}

export default modelValidate
