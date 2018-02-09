import { SubmissionError } from 'redux-form'

const submit = ({ Model }, dispatch, { removeNBAModel, model }) => {
  if (Model !== model.name) {
    throw new SubmissionError({
      Model: 'Incorrect model name',
      _error: 'Incorrect model name'
    })
  } else {
    return removeNBAModel(model.id)
  }
}

export default submit
