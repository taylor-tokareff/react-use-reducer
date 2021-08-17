import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders App', () => {
    render(<App />);
    const display = screen.getByTestId('display');
    const colorInput = screen.getByTestId('color-input');
    const undoButton = screen.getByText('undo');
    const redoButton = screen.getByText('redo');

    expect(display).toHaveStyle({ backgroundColor: '#FF0000' });

    fireEvent.change(colorInput, { target: { value: '#0000FF' } });
    expect(display).toHaveStyle({ backgroundColor: '#0000FF' });

    fireEvent.click(undoButton);
    expect(display).toHaveStyle({ backgroundColor: '#FF0000' });

    fireEvent.click(redoButton);
    expect(display).toHaveStyle({ backgroundColor: '#0000FF' });



  });
});
