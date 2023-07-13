import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Podcasts } from './Podcasts'

const searchValidation = (searchEl: HTMLInputElement, text: string, founded: number): void => {
  const countEl = screen.getByTestId('count')

  fireEvent.change(searchEl, { target: { value: text } })
  expect(searchEl.value).toBe(text)
  expect(countEl.innerHTML).toEqual(founded.toString())
}

describe('Podcasts', () => {
  beforeEach(async () => {
    await waitFor(() => render(<Podcasts/>))
  })

  test('should render podcasts', async () => {
    const countEl = screen.getByTestId('count')
    expect(countEl).toBeDefined()
    expect(screen.findByText('Author: The Joe Budden Network')).not.toBe(null)
    expect(countEl.innerHTML).toEqual('100')
    // screen.debug()
  })

  test('should filter podcasts', () => {
    const searchEl = screen.getByTestId('search')
    expect(searchEl).toBeDefined()
    if (searchEl instanceof HTMLInputElement) {
      searchValidation(searchEl, 'p', 70)
      searchValidation(searchEl, 'pr', 13)
      searchValidation(searchEl, 'pre', 5)
      searchValidation(searchEl, 'pres', 4)
      searchValidation(searchEl, 'prest', 0)
      searchValidation(searchEl, '', 100)
    }
  })
})
