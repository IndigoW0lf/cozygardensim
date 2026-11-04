import { test, expect } from '@playwright/test';

test('the built app supports keyboard planting, independent plants and a fresh session', async ({ page }) => {
  const errors = [];
  const external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') external.push(request.url());
  });
  await page.goto('/');
  await expect(page).toHaveTitle('Cozy Garden Simulator');
  await expect(page.getByText('Your garden is waiting for its first seed.')).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Plant a sunflower' })).toBeFocused();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Plant a sunflower' }).click();
  await expect(page.getByRole('heading', { name: 'Sunflower', exact: true })).toHaveCount(2);
  await expect(page.getByText('Stage: seed', { exact: true })).toHaveCount(2);
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(fits).toBe(true);
  await page.reload();
  await expect(page.getByText('Your garden is waiting for its first seed.')).toBeVisible();
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('the real timer updates the visible stage without a five-minute wait', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.getByRole('button', { name: 'Plant a sunflower' }).click();
  for (let tick = 0; tick < 5; tick += 1) await page.clock.runFor(60_000);
  await expect(page.getByText('Stage: sprouting', { exact: true })).toBeVisible();
});
