import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import App from '../App';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe('React_Router App', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders the Home page by default without console errors', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderAt('/');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });

  it('navigates to About when the About link is clicked', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.click(screen.getByRole('link', { name: 'About' }));
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('navigates to Contact when the Contact link is clicked', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.click(screen.getByRole('link', { name: 'Contact' }));
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
  });

  it('shows a 404 page for an unknown route', () => {
    renderAt('/does-not-exist');
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
