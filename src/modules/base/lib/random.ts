/**
 * Generates a number between min and max
 */
export const randomRange = (min: number, max: number) => {
  if (max < min) {
    ;[max, min] = [min, max]
  }
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Returns a random item in choices
 * @param choices An array of items
 */
export const randomChoice = <T>(choices: T[]): T => {
  if (choices.length === 0) throw new Error('Empty array')
  const index = Math.floor(randomRange(0, choices.length))
  return choices[index]
}

export type WeightedChoice<T> = { weight: number; choice: T }

export const randomWeighted = <T>(choices: WeightedChoice<T>[]): T => {
  if (choices.length === 0) throw new Error('Empty array')

  // Normalize weights
  const totalWeights = choices.map((c) => c.weight).reduce((a, b) => a + b, 0)
  const choicesNormalized = choices.map((c) => ({
    choice: c.choice,
    weight: c.weight / totalWeights,
  }))
  const r = Math.random()

  let cumulated = 0
  for (const { weight, choice } of choicesNormalized) {
    cumulated += weight

    if (cumulated >= r) {
      // Select this choice
      return choice
    }
  }

  return choices[choices.length - 1].choice
}

/**
 * Generates a random string
 * @param length
 * @param characters
 */
export const randomString = (
  length: number,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
) => {
  let result = ''
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

/**
 * Generate a code
 * @param nbDigits Number of digits
 */
export const generateCode = (nbDigits: number): string => {
  const digits: number[] = []
  const code: number[] = []

  // Generate code
  for (let i = 0; i < nbDigits; i++) {
    if (digits.length === 0) {
      digits.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    }

    const selectedIndex = Math.floor(Math.random() * digits.length)
    code.push(digits[selectedIndex])
    digits.splice(selectedIndex, 1)
  }

  // Shuffle code
  for (let i = code.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[code[i], code[j]] = [code[j], code[i]]
  }

  return code.join('')
}
