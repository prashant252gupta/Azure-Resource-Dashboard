import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react'
import { render } from 'react-dom'
window.React = React

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
