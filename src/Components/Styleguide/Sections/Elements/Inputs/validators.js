// at least one letter
// at least one number
// no symbols
export const email = () => {
  return (label, val) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!val || re.test(val)) return null

    return `Please enter a valid ${label.toLowerCase()} address`
  }
}

export const presence = () => {
  return (label, val) => {
    if (val) return null

    return `${label} is required`
  }
}

export const minChar = (length) => {
  return (field, val) => {
    if (!val || val.length >= length) return null

    return `${field} must be at least ${length} characters`
  }
}
