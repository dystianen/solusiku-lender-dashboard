const filters = {
  currency(value: number) {
    if (typeof value !== 'number') {
      return value
    }
    var formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    return formatter.format(value)
  }
}
export default filters
