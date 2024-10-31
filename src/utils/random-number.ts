const generateRandomNumbers = (): string => {
  let result = ''
  for (let i = 0; i < 4; i++) {
    const randomDigit = Math.floor(Math.random() * 10) // Random digit between 0 and 9
    result += randomDigit.toString()
  }
  return result
}

export default generateRandomNumbers
