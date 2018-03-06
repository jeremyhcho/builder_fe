const getDateQuery = (dateQuery) => {
  // ?date=YYYY-MM-DD
  const re1 = '(\\?)'
  const re2 = '(date)'
  const re3 = '(=)'
  const re4 = '((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3}))[-:\\/.](?:[0]?[1-9]|[1][012])[-:\\/.](?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])'

  const dateRegexp = new RegExp(re1 + re2 + re3 + re4, ['i'])
  return dateRegexp.exec(dateQuery)
}

export default getDateQuery
