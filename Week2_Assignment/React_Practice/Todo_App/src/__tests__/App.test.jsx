import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import App from '../App';

describe('Todo_App', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders without console errors and shows the empty state', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('adds a task via the form and it appears in the list', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Buy milk');
    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(input).toHaveValue(''); // input cleared after submit
  });

  it('does not add a blank task', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('deletes a task when Delete is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Walk the dog');
    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /delete walk the dog/i }));
    expect(screen.queryByText('Walk the dog')).not.toBeInTheDocument();
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('toggles a task as completed', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Read a book');
    await user.click(screen.getByRole('button', { name: /add/i }));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
