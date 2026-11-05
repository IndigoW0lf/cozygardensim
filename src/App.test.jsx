import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import reducer from './store/reducers';

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { cleanup(); vi.clearAllTimers(); vi.useRealTimers(); });
function openGarden() {
  const store = createStore(reducer);
  render(<Provider store={store}><App /></Provider>);
  return store;
}
const time = ms => act(() => { vi.advanceTimersByTime(ms); });

test('the visible loop plants, grows, harvests and keeps the emptied bed actionable', () => {
  const store = openGarden();
  const bedButton = screen.getByRole('button', { name: 'Plant Sunflower in bed 1' });
  fireEvent.click(bedButton);
  expect(store.getState().player.coins).toBe(90);
  time(60_000);
  const harvest = screen.getByRole('button', { name: 'Harvest Sunflower from bed 1' });
  expect(harvest).toBe(bedButton);
  fireEvent.click(harvest);
  expect(store.getState().player.coins).toBe(106);
  expect(screen.getByRole('button', { name: 'Plant Sunflower in bed 1' })).toBe(bedButton);
});

test('packet selection does not spend money until planting', () => {
  const store = openGarden();
  fireEvent.click(screen.getByRole('button', { name: 'Select Calendula seeds' }));
  expect(store.getState().player.coins).toBe(100);
  fireEvent.click(screen.getByRole('button', { name: 'Plant Calendula in bed 2' }));
  expect(store.getState().player.coins).toBe(86);
  expect(store.getState().garden.plants[0].speciesId).toBe('calendula');
});

test('pause and resume do not catch up time spent paused', () => {
  const store = openGarden();
  fireEvent.click(screen.getByRole('button', { name: 'Plant Sunflower in bed 1' }));
  time(10_000);
  fireEvent.click(screen.getByRole('button', { name: 'Pause garden' }));
  time(60_000);
  expect(store.getState().garden.plants[0].grownMs).toBe(10_000);
  fireEvent.click(screen.getByRole('button', { name: 'Resume garden' }));
  time(10_000);
  expect(store.getState().garden.plants[0].grownMs).toBe(20_000);
});

test('a full shelf choice cannot overdraw the wallet', () => {
  const store = openGarden();
  fireEvent.click(screen.getByRole('button', { name: 'Select Moonflower seeds' }));
  for (let bed = 1; bed <= 5; bed += 1) fireEvent.click(screen.getByRole('button', { name: `Plant Moonflower in bed ${bed}` }));
  expect(store.getState().player.coins).toBe(0);
  expect(screen.getByRole('button', { name: 'Plant Moonflower in bed 6' }).disabled).toBe(true);
});
