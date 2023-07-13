import { render, screen, waitFor } from '@testing-library/react'
import { Detail } from './Detail'
import { getPopularPodcasts } from '../services/itunes'

const [{ id, title, author, description }] = await getPopularPodcasts()

describe('Detail', () => {
  beforeEach(async () => {
    await waitFor(() => render(<Detail podcastId={id} />))
  })

  test('should render the podcast', async () => {
    expect(screen.findByText(title)).not.toBe(null)
    expect(screen.findByText(`by ${author}}`)).not.toBe(null)
    expect(screen.findByText('Description')).not.toBe(null)
    expect(screen.findByText(description)).not.toBe(null)
  })
})
