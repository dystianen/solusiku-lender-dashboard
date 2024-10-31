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
  },
  formatFileSize(size: number): string {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB']
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed()} ${units[unitIndex]}`
  }
}
export default filters
