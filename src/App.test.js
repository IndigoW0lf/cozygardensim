import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './store/reducers';

jest.mock('nanoid', () => ({ nanoid: () => 'test-sunflower' }));

test('the application renders its garden and catalog without missing-state crashes', () => {
  const store = createStore(rootReducer);
  render(<Provider store={store}><App /></Provider>);
  expect(screen.getByRole('heading', { name: 'Cozy Garden Simulator' })).toBeTruthy();
  expect(screen.getByRole('heading', { name: 'Plants to discover' })).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'Purchase' })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Plant a sunflower' }));
  expect(screen.getByRole('heading', { name: 'Sunflower' })).toBeTruthy();
  expect(store.getState().garden.plants[0]).toMatchObject({
    id: 'test-sunflower', growthStage: 'seed', timeUntilNextStage: 5,
  });
});
