import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  test('should render Header', () => {
    render(<Header/>)
    expect(screen.getByText('Podcaster')).toBeDefined()
  })
})
