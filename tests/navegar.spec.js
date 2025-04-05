import { test, expect } from '@playwright/test';

test('Navigate to demoblaze', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');
    await expect(page).toHaveTitle(/STORE/);
});

test('Select a product', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');
    await page.click('a:has-text("Samsung galaxy s6")');
    await expect(page.locator('.name')).toHaveText('Samsung galaxy s6');
});

/*test('Add product to cart', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');
    await page.click('a:has-text("Samsung galaxy s6")');
    await page.click('a:has-text("Add to cart")');
    page.on('dialog', dialog => dialog.accept());
});*/

test('Add product to cart', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');
    await page.click('a:has-text("Samsung galaxy s6")');
    const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),
    page.click('a:has-text("Add to cart")'),
    ]);
    await dialog.accept();
    await page.waitForTimeout(2000);
});

test('Validate product is in cart', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');
    await page.click('a:has-text("Cart")');
    await expect(page.locator('td:has-text("Samsung galaxy s6")')).toBeVisible();

});

test('Delete product from cart', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');
    await page.click('a:has-text("Cart")');
    await page.click('a:has-text("Delete")');
});
