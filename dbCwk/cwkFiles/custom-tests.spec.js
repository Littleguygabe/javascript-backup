import exp from 'constants';

const {test,expect} = require('@playwright/test');

const websiteURL = 'http://127.0.0.1:5500/cwkFiles/peopleSearch/index.html';

test.beforeEach(async ({ page }) => {
   await page.goto(websiteURL);
});

// People Search tests

test('Error due to 2 search attributes',async ({page})=>{
    await page.locator('#name').fill('Rachel')
    await page.locator('#rego').fill('KWK')
    await page.getByRole('button', {name:'Submit'}).click()
    await expect(page.locator('#message')).toContainText('Error')

})

test('People search called with no arguments',async ({page})=>{
    await page.getByRole('button', {name:'Submit'}).click()
    await expect(page.locator('#message')).toContainText('Error')   
})

test('no matches for name',async ({page})=>{
    await page.locator('#name').fill('1')   
    await page.getByRole('button', {name:'Submit'}).click()
    await expect(page.locator('#message')).toContainText('Error')
})

test('no matches for license number',async ({page})=>{
    await page.locator('#rego').fill('sfdg')   
    await page.getByRole('button', {name:'Submit'}).click()
    await expect(page.locator('#message')).toContainText('Error')
})

// Vehicle search
test('vehicle search with no rego provided',async ({page})=>{
    await page.getByRole('link', { name: 'Vehicle search' }).click();
    await page.getByRole('button', {name:'Submit'}).click()
    await expect(page.locator('#message')).toContainText('Error')   

})

test('vehicle search with no rego matches',async ({page})=>{
    await page.getByRole('link', { name: 'Vehicle search' }).click();
    await page.locator('#rego').fill('sfdg')   
    await page.getByRole('button', {name:'Submit'}).click()
    await expect(page.locator('#message')).toContainText('Error')   

})

test('vehicle search with 3 rego matches',async ({page})=>{
    await page.getByRole('link', { name: 'Vehicle search' }).click();
    await page.locator('#rego').fill('5')   
    await page.getByRole('button', {name:'Submit'}).click()
    await expect(page.locator('#message')).toContainText('Search successful')

    await expect(page.locator('#results').locator('div')).toHaveCount(3)
})

// add vehicle tests
test('missing registration',async ({page})=>{
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   await page.locator('#make').fill('Porsche')
   await page.locator('#model').fill('Taycan')
   await page.locator('#colour').fill('white')
   await page.locator('#owner').fill('Kai')
   await page.getByRole('button', { name: 'Add vehicle' }).click();

    await expect(page.locator('#message-vehicle')).toContainText('Error')
})

test('missing make',async ({page})=>{
    await page.getByRole('link', { name: 'Add a vehicle' }).click();
    await page.locator('#rego').fill('LKJ23UO')
    await page.locator('#model').fill('Taycan')
    await page.locator('#colour').fill('white')
    await page.locator('#owner').fill('Kai')
    await page.getByRole('button', { name: 'Add vehicle' }).click();

    await expect(page.locator('#message-vehicle')).toContainText('Error')
})

test('missing model',async ({page})=>{
    await page.getByRole('link', { name: 'Add a vehicle' }).click();
    await page.locator('#rego').fill('LKJ23UO')
    await page.locator('#make').fill('Porsche')  
    await page.locator('#colour').fill('white')
    await page.locator('#owner').fill('Kai')
    await page.getByRole('button', { name: 'Add vehicle' }).click();

    await expect(page.locator('#message-vehicle')).toContainText('Error')
})

test('missing colour',async ({page})=>{
    await page.getByRole('link', { name: 'Add a vehicle' }).click();
    await page.locator('#rego').fill('LKJ23UO')
    await page.locator('#make').fill('Porsche')  
    await page.locator('#model').fill('Taycan')
    await page.locator('#owner').fill('Kai')
    await page.getByRole('button', { name: 'Add vehicle' }).click();

    await expect(page.locator('#message-vehicle')).toContainText('Error')
})

test('missing owner',async ({page})=>{
    await page.getByRole('link', { name: 'Add a vehicle' }).click();
    await page.locator('#rego').fill('LKJ23UO')
    await page.locator('#make').fill('Porsche')  
    await page.locator('#model').fill('Taycan')
    await page.locator('#colour').fill('white')
    await page.getByRole('button', { name: 'Add vehicle' }).click();

    await expect(page.locator('#message-vehicle')).toContainText('Error')
})




