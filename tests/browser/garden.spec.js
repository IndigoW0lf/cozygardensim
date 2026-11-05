import { test, expect } from '@playwright/test';

const bed = (page, number) => page.getByRole('article', { name: `BED ${String(number).padStart(2, '0')}`, exact: true });

test('a keyboard player can complete the loop without errors or external requests', async ({ page }) => {
  const errors = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') external.push(request.url());
  });
  await page.clock.install();
  await page.goto('/');
  await expect(page).toHaveTitle('Cozy Garden Simulator');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Pause garden' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Select Sunflower seeds' })).toBeFocused();
  await page.keyboard.press('Enter');
  for (let i = 0; i < 3; i += 1) await page.keyboard.press('Tab');
  await expect(bed(page, 1).getByRole('button')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('coin-balance')).toHaveText('90');
  await page.clock.runFor(60_000);
  const harvest = bed(page, 1).getByRole('button', { name: 'Harvest Sunflower from bed 1' });
  await harvest.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('coin-balance')).toHaveText('106');
  await expect(bed(page, 1).getByRole('button', { name: 'Plant Sunflower in bed 1' })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await expect(page.getByTestId('coin-balance')).toHaveText('100');
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('new planting and moon boundaries do not postpone another plant', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await bed(page, 1).getByRole('button').click();
  await page.clock.runFor(30_000);
  await bed(page, 2).getByRole('button').click();
  await page.clock.runFor(30_000);
  await expect(bed(page, 1).getByRole('button', { name: 'Harvest Sunflower from bed 1' })).toBeEnabled();
  await expect(bed(page, 2).getByRole('progressbar')).toHaveAttribute('value', '50');
  await page.clock.runFor(30_000);
  await expect(bed(page, 2).getByRole('button', { name: 'Harvest Sunflower from bed 2' })).toBeEnabled();
  await expect(page.getByText('Full moon · a little magic for Moonflower')).toBeVisible();
});

test('pause and an empty wallet both have clear visible outcomes', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.getByRole('button', { name: 'Select Moonflower seeds' }).click();
  for (let i = 1; i <= 5; i += 1) await bed(page, i).getByRole('button').click();
  await expect(page.getByTestId('coin-balance')).toHaveText('0');
  await expect(bed(page, 6).getByRole('button')).toBeDisabled();
  await page.getByRole('button', { name: 'Pause garden' }).click();
  const pausedProgress = await bed(page, 1).getByRole('progressbar').getAttribute('value');
  await page.clock.runFor(180_000);
  await expect(bed(page, 1).getByRole('progressbar')).toHaveAttribute('value', pausedProgress);
  await page.getByRole('button', { name: 'Resume garden' }).click();
  await page.clock.runFor(120_000);
  await expect(bed(page, 1).getByRole('button', { name: 'Harvest Moonflower from bed 1' })).toBeEnabled();
});
