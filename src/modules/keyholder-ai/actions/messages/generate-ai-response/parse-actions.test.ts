import { parseActions } from './parse-actions'

describe('parseActions', () => {
  it('should return empty array when no actions are found', () => {
    const response = 'Just a regular message without any actions'
    expect(parseActions(response)).toEqual([])
  })

  it('should parse add_time action with ISO duration', () => {
    const response =
      'I think you deserve some extra time... [ACTION{"name":"add_time","params":"PT5M"}] I\'ve added 5 minutes to your lock.'
    const result = parseActions(response)
    expect(result).toEqual([
      {
        action: {
          name: 'add_time',
          params: 300, // 5 minutes in seconds
        },
      },
    ])
  })

  it('should parse remove_time action with ISO duration', () => {
    const response =
      'I\'ll remove some time... [ACTION{"name":"remove_time","params":"PT1H"}] I\'ve removed 1 hour from your lock.'
    const result = parseActions(response)
    expect(result).toEqual([
      {
        action: {
          name: 'remove_time',
          params: 3600, // 1 hour in seconds
        },
      },
    ])
  })

  it('should parse freeze action', () => {
    const response =
      'I\'m going to freeze your lock... [ACTION{"name":"freeze"}] Your lock is now frozen.'
    const result = parseActions(response)
    expect(result).toEqual([
      {
        action: {
          name: 'freeze',
        },
      },
    ])
  })

  it('should parse unfreeze action', () => {
    const response =
      'I\'ll unfreeze your lock... [ACTION{"name":"unfreeze"}] Your lock is now unfrozen.'
    const result = parseActions(response)
    expect(result).toEqual([
      {
        action: {
          name: 'unfreeze',
        },
      },
    ])
  })

  it('should parse pillory action with duration and reason', () => {
    const response =
      'You\'re going in the pillory... [ACTION{"name":"pillory","params":{"duration":"PT30M","reason":"For being too cheeky"}}] You\'ll stay there for 30 minutes.'
    const result = parseActions(response)
    expect(result).toEqual([
      {
        action: {
          name: 'pillory',
          params: {
            duration: 1800, // 30 minutes in seconds
            reason: 'For being too cheeky',
          },
        },
      },
    ])
  })

  it('should parse pillory action without reason', () => {
    const response =
      'You\'re going in the pillory... [ACTION{"name":"pillory","params":{"duration":"PT1H"}}] You\'ll stay there for 1 hour.'
    const result = parseActions(response)
    expect(result).toEqual([
      {
        action: {
          name: 'pillory',
          params: {
            duration: 3600, // 1 hour in seconds
          },
        },
      },
    ])
  })

  it('should parse multiple actions in the same response', () => {
    const response =
      'First, I\'ll add time... [ACTION{"name":"add_time","params":"PT10M"}] Then freeze... [ACTION{"name":"freeze"}]'
    const result = parseActions(response)
    expect(result).toEqual([
      {
        action: {
          name: 'add_time',
          params: 600, // 10 minutes in seconds
        },
      },
      {
        action: {
          name: 'freeze',
        },
      },
    ])
  })

  it('should handle complex ISO durations', () => {
    const response =
      'Adding a complex duration... [ACTION{"name":"add_time","params":"PT2H30M15S"}]'
    const result = parseActions(response)

    expect(result).toEqual([
      {
        action: {
          name: 'add_time',
          params: 9015, // 2 hours, 30 minutes, 15 seconds in seconds
        },
      },
    ])
  })

  it('should handle invalid JSON gracefully', () => {
    const response = 'Invalid action... [ACTION{invalid json}]'
    const result = parseActions(response)
    expect(result).toEqual([])
  })

  it('should handle invalid action type gracefully', () => {
    const response =
      'Invalid action type... [ACTION{"name":"invalid_action","params":"PT5M"}]'
    const result = parseActions(response)
    expect(result).toEqual([])
  })

  it('should handle invalid duration format gracefully', () => {
    const response =
      'Invalid duration... [ACTION{"name":"add_time","params":"invalid"}]'
    const result = parseActions(response)
    expect(result).toEqual([])
  })

  it('should handle missing required fields gracefully', () => {
    const response = 'Missing fields... [ACTION{"params":"PT5M"}]'
    const result = parseActions(response)
    expect(result).toEqual([])
  })
})
