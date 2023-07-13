// import { expect, test, describe } from 'vitest'
import { convertMsToTime } from './time'

describe('time', () => {
  test('should convert time milliseconds to time string', () => {
    const time = 10659000
    const timeToString = '02:57:39'
    expect(convertMsToTime(time)).toBe(timeToString)
  })
})
