import React from 'react';
import { render, screen } from '@testing-library/react';
import Board from './Board';
import GameOfLife from './gameOfLife';

test('renders learn react link', () => {
  render(<Board game={new GameOfLife()}/>);
});
