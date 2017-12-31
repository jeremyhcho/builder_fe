export const presence = (value, form, input, name) => {
  return value ? null : `${name} is required`
}

export const minChar = (length) => (value, form, input, name) => {
  return value && value.length < length ? `${name} must be ${length} characters or more` : null
}

export const email = (value) => {
  const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (emailRe.test(value)) return null
  return 'Please enter a valid email address'
}

export const equality = (inputName) => (value, form) => {
  // equality takes in the name(string) of an input
  if (form[inputName] === value) return null
  return `${inputName}s do not match`
}

export const minWord = (length) => (value, form, input, name) => {
  const words = value.split(' ')
  if (words.length >= length && words.every(word => word.length)) return null
  return `${name} must be ${length} words or more`
}

export const zipCode = (value) => {
  const usZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/
  return usZipCode.test(value) ? null : 'Not a valid zip code'
}
