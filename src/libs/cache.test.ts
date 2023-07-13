// import { expect, test, describe, assert } from 'vitest'
import { readFromCache, saveToCache } from './cache'

describe('cache', () => {
  test('should save a data in cache', () => {
    const key = 'cache-key'
    const value = {
      name: 'Jhon'
    }
    const expiration = 1
    const data = { expiration, value }
    const output = JSON.stringify(data)
    saveToCache(key, value, 1)
    const cacheData = window.localStorage.getItem(key)
    expect(output).eq(cacheData)
  })

  test('should write and retrieve the same value from cache', () => {
    const key = 'cache-key'
    const value = {
      name: 'Jhon'
    }
    saveToCache(key, value)
    const expiration = 1
    const data = { expiration, value }
    const result = readFromCache(key) as typeof data
    if (result != null) {
      const { value: resultValue } = result
      assert.deepEqual(value, resultValue, 'matches original')
    }
  })
})
