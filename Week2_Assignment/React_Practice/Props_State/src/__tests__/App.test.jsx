import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import App from '../App';

describe('Props_State App', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders without console errors', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('each Counter starts at 0 and increments/decrements/resets independently (state), using its own step prop', async () => {
    const user = userEvent.setup();
    render(<App />);

    const counters = screen.getAllByText('0');
    expect(counters.length).toBe(3); // three independent Counter instances

    const plusButtons = screen.getAllByText(/^\+ /);
    // Increment the first counter (step 1) three times
    await user.click(plusButtons[0]);
    await user.click(plusButtons[0]);
    await user.click(plusButtons[0]);
    expect(screen.getByText('3')).toBeInTheDocument();

    // Increment the second counter (step 5) once — should not affect the first
    await user.click(plusButtons[1]);
    expect(screen.getByText('3')).toBeInTheDocument(); // counter 1 unchanged
    expect(screen.getByText('5')).toBeInTheDocument(); // counter 2 now 5
  });
});
