import { render, screen } from '@testing-library/react';
import App from './App';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

describe('App', () => {
  test('renders elements', () => {
    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /cart icon/i
      })
    ).toBeInTheDocument();
  });
});
