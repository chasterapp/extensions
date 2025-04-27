const units = [
  { unit: 'seconds', short: 's', value: 1 },
  { unit: 'minutes', short: 'm', value: 60 },
  { unit: 'hours', short: 'h', value: 60 * 60 },
  { unit: 'days', short: 'd', value: 60 * 60 * 24 },
  { unit: 'weeks', short: 'w', value: 60 * 60 * 24 * 7 },
  { unit: 'months', short: 'mo', value: 60 * 60 * 24 * 30 },
]

export const getDurationMainUnit = (duration: number) => {
  for (let i = 0; i < units.length - 1; i++) {
    const unit = units[i]
    const nextUnit = units[i + 1]
    if (duration < nextUnit.value) {
      return unit
    }
  }

  return units[units.length - 1]
}

export type DurationFullRangeOptions = {
  limitTo?: string
  short?: boolean
  mainUnit?: boolean
}

const defaultDurationFullRangeOptions = { limitTo: 'days', short: false }

export const durationFullRange = (
  duration: number,
  options: DurationFullRangeOptions = {},
) => {
  duration = Math.max(duration, 0)

  options = {
    ...defaultDurationFullRangeOptions,
    ...options,
  }

  const { limitTo, short } = options

  let d = duration
  const durationUnits = []
  let ignore = true

  for (let i = units.length - 1; i >= 0; i--) {
    const unit = units[i]
    if (unit.unit !== limitTo && ignore) {
      continue
    } else {
      ignore = false
    }

    const amount = Math.floor(d / unit.value)
    if (amount !== 0) {
      const unitName =
        amount > 1 ? unit.unit : unit.unit.substring(0, unit.unit.length - 1)
      durationUnits.push({ unit: unitName, short: unit.short, value: amount })
      d -= unit.value * amount
    }
  }

  if (durationUnits.length === 0) return `0${short ? 'm' : ' minute'}`

  const text = durationUnits
    .map((unit) => `${unit.value}${short ? unit.short : ` ${unit.unit}`}`)
    .join(' ')

  if (options.mainUnit) {
    return text.split(' ')[0]
  }

  return text
}

export const durationMainRange = (duration: number) => {
  const unit = getDurationMainUnit(duration)

  const minNumber = Math.round(duration / unit.value)

  const minUnitName =
    minNumber > 1 ? unit.unit : unit.unit.substring(0, unit.unit.length - 1)

  return `${minNumber} ${minUnitName}`
}

export const durationRange = (min: number, max: number) => {
  const minUnit = getDurationMainUnit(min)
  const maxUnit = getDurationMainUnit(max)

  const minNumber = Math.round(min / minUnit.value)
  const maxNumber = Math.round(max / maxUnit.value)

  const minUnitName =
    minNumber > 1
      ? minUnit.unit
      : minUnit.unit.substring(0, minUnit.unit.length - 1)
  const maxUnitName =
    maxNumber > 1
      ? maxUnit.unit
      : maxUnit.unit.substring(0, maxUnit.unit.length - 1)

  if (minUnit.unit === maxUnit.unit) {
    if (minNumber === maxNumber) {
      if (minNumber === 0) return ''
      return `${maxNumber} ${maxUnitName}`
    }
    return `${minNumber} - ${maxNumber} ${maxUnitName}`
  }
  return `${minNumber} ${minUnitName} - ${maxNumber} ${maxUnitName}`
}
