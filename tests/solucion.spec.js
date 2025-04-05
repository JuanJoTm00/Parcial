import { test, expect } from '@playwright/test';

test('Add, validate, and remove product from cart', async ({ page }) => {
await page.goto('https://www.demoblaze.com');
await page.click('a:has-text("Samsung galaxy s6")');

const [alert] = await Promise.all([
    page.waitForEvent('dialog'),
    page.click('a:has-text("Add to cart")'),
]);
    await alert.accept();
    await page.waitForTimeout(2000);
    await page.click('a:has-text("Cart")');
    await expect(page.locator('td:has-text("Samsung galaxy s6")')).toBeVisible();
    await page.click('a:has-text("Delete")');
    await page.waitForTimeout(2000);
    await expect(page.locator('td:has-text("Samsung galaxy s6")')).toHaveCount(0);
});
