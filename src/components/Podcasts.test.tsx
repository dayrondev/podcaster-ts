import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Podcasts } from './Podcasts'
import { getPopularPodcasts } from '../services/itunes'

const [{ title, author }] = await getPopularPodcasts()

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
    expect(screen.findByText(title)).not.toBe(null)
    expect(screen.findByText(`Author: ${author}`)).not.toBe(null)
    expect(countEl.innerHTML).toEqual('100')
    // screen.debug()
  })

  test('should filter podcasts', () => {
    const searchEl = screen.getByTestId('search')
    expect(searchEl).toBeDefined()
    expect(searchEl).toBeInstanceOf(HTMLInputElement)

    const searchInput = searchEl as HTMLInputElement
    searchValidation(searchInput, 'p', 70)
    searchValidation(searchInput, 'pr', 13)
    searchValidation(searchInput, 'pre', 5)
    searchValidation(searchInput, 'pres', 4)
    searchValidation(searchInput, 'prest', 0)
    searchValidation(searchInput, '', 100)
  })
})
