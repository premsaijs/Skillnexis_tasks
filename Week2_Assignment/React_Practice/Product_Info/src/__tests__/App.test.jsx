import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import App from '../App';

describe('Product_Info App', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders without throwing and logs no console errors', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('renders a ProductCard for each product with name, price, and stock status', () => {
    render(<App />);
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('$59.99')).toBeInTheDocument();
    expect(screen.getAllByText('In Stock').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Out of Stock').length).toBeGreaterThan(0);
  });
});
