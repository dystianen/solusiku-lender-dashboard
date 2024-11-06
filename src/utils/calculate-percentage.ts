const calculatePercentage = (amount1: number, amount2: number) => {
  if (amount2 === 0) return 0

  const percentage = (amount1 / amount2) * 100
  return Number(percentage.toFixed(2))
}

export default calculatePercentage
