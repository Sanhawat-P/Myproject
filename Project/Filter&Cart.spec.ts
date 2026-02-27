import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(
    page.locator('.inventory_item')
        .filter({hasText: 'Sauce Labs Backpack'})
        .getByRole('button')
  ).toHaveText('Remove')
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(
    page.locator('.inventory_item')
        .filter({hasText: 'Sauce Labs Bike Light'})
        .getByRole('button')
  ).toHaveText('Remove')
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(
    page.locator('.inventory_item')
        .filter({hasText: 'Sauce Labs Backpack'})
        .getByRole('button')
  ).toHaveText('Add to cart')
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});