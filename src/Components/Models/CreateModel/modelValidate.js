/* eslint-disable no-underscore-dangle */
const modelValidate = ({ name, type, status, ...specs }) => {
  const errors = {}

  if (!type) {
    errors.type = 'You must choose a model type'
  }

  if (Object.keys(specs).length) {
    const specsTotal = Object.values(specs)
      .reduce((total, val) => parseInt(total, 10) + parseInt(val, 10))

    if (specsTotal !== 25) {
      errors[Object.keys(specs)[0]] = `${25 - specsTotal}`
    }
  }
  /* eslint-enable no-underscore-dangle */
  return errors
}

export default modelValidate
