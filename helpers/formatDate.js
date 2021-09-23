function showDateItemPost (date) {
  let year = date.getFullYear()
  let month = date.toLocaleString('en-us', { month: 'long' })
  let day = date.getDate()

  return (`${day}-${month}-${year}`)
}

module.exports = showDateItemPost