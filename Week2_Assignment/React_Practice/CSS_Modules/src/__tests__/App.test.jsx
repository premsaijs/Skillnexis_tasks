import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import App from '../App';

describe('CSS_Modules App', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders without console errors', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('renders both cards with real, non-global scoped class names', () => {
    render(<App />);
    const heading = screen.getByText(/Locally Scoped/).closest('h3');
    const card = heading.closest('div');
    // A CSS Module class name is never the literal source name ("card") —
    // it's a generated, scoped identifier (e.g. "_card_abc123").
    expect(card.className).not.toBe('');
    expect(card.className).not.toBe('card');
    expect(card.className.toLowerCase()).toContain('card');
  });
});
