const precisionRound = (decimalPlace) => (number) => {
  if (isNaN(number)) return number

  const factor = 10 ** decimalPlace
  return Math.round(number * factor) / factor
}

export default precisionRound
