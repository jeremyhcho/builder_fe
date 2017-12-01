export const presence = () => {
  return (label, val) => {
    if (val) return null
    return `${label} is required`
  }
}

// export const minChar = (length) => {
//   return (val, label) => {
//     if (!val || val.length >= length) return null
//
//     return `${label} must be at least ${length} characters`
//   }
// }

export const email = () => {
  return (label, val) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!val || re.test(val)) return null

    return `Please enter a valid ${label.toLowerCase()} address`
  }
}

export const testValidation = (length) => {
  return (value) => {
    console.log(value)
    if (!value || value >= length) return undefined

    return `Must be ${length} characters or more`
  }
}

export const minChar = min => (value, input) => (
  value && value.length < min ? `${Object.keys(input)[0]} must be ${min} characters or more` : undefined
)
