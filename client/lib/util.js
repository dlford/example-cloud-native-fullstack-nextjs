export const formatDate = ({ dateString }) => {
  const stringPad = (value) => {
    const string = '0' + value
    return string.slice(-2)
  }

  const date = new Date(parseInt(dateString))
  const y = date.getFullYear()
  const m = stringPad(date.getMonth() + 1)
  const d = stringPad(date.getDate())
  const h = date.getHours()
  const M = stringPad(date.getMinutes())
  const s = stringPad(date.getSeconds())

  return `${y}/${m}/${d} ${h > 12 ? h - 12 : h}:${M}:${s} ${
    h > 12 ? 'PM' : 'AM'
  }`
}

export const getIdAttrib = (element) => {
  const result = element.dataset.id || null

  if (!result) {
    console.log('Element has no "data-id" attribute!')
  }

  return result
}
