import React from 'react';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './store/reducers';

jest.mock('nanoid', () => ({ nanoid: () => 'test-sunflower' }));

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.useRealTimers();
});

function renderGarden() {
  const store = createStore(rootReducer);
  render(<Provider store={store}><App /></Provider>);
  return store;
}

test('the application renders its garden and catalog without missing-state crashes', () => {
  const store = renderGarden();
  expect(screen.getByRole('heading', { name: 'Cozy Garden Simulator' })).toBeTruthy();
  expect(screen.getByRole('heading', { name: 'Plants to discover' })).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'Purchase' })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Plant a sunflower' }));
  expect(screen.getByRole('heading', { name: 'Sunflower' })).toBeTruthy();
  expect(store.getState().garden.plants[0]).toMatchObject({
    id: 'test-sunflower', growthStage: 'seed', timeUntilNextStage: 5,
  });
});

test('the displayed plant advances after five simulated minute ticks', () => {
  renderGarden();
  fireEvent.click(screen.getByRole('button', { name: 'Plant a sunflower' }));
  expect(screen.getByText('Stage: seed')).toBeTruthy();
  for (let tick = 0; tick < 5; tick += 1) {
    act(() => { jest.advanceTimersByTime(60000); });
  }
  expect(screen.getByText('Stage: sprouting')).toBeTruthy();
});
