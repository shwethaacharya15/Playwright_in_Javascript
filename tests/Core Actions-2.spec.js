import { test, expect } from '@playwright/test';

test.describe("Core Actions - 2", () => {

  test('Automate drag-drop demo site ', async ({ page }) => {
    // Navigate to a drag-drop demo site
    await page.goto("https://demoqa.com/droppable");

    // ---- FOCUS ---- (Spotlight on draggable object)
    const draggable = page.locator("#draggable");
    await draggable.focus();

    // ---- HOVER ---- (Peek before grabbing furniture)
    await draggable.hover();

    // ---- DRAG & DROP ---- (Move furniture to new spot)
    const target = page.locator("#droppable").first();
    await draggable.dragTo(target);

    await expect(target).toHaveText(/Dropped!/);

})

test.describe("Core Actions - 2", () => {
    test('Automate double click', async({page})=>{
        // ---- DOUBLE CLICK ---- (Open the treasure chest)
    await page.goto("https://demoqa.com/buttons");
    await page.dblclick("//button[text()='Double Click Me']");
    await expect(page.locator("#doubleClickMessage")).toContainText("You have done a double click");
    })
})

test.describe("Core Actions - 2", () => {
    test ('Automate keyboard shortcuts', async({page})=>{
        // ---- DOUBLE CLICK ---- (Open the treasure chest)
     await page.goto("https://www.saucedemo.com/");
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.keyboard.press("Control+A");   // select all in password field
    await page.keyboard.press("Control+C");   // copy
    await page.keyboard.press("Control+V");   // paste
    })
})

test.describe("Core Actions - 2", () => {
    test.only ('Automate scroll', async({page})=>{
    await page.goto("https://www.saucedemo.com/inventory.html");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));



})
})
})