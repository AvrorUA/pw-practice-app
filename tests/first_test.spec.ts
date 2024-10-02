import {expect, test} from '@playwright/test'

// execute code to run before all tests beforeAll
// test.beforeAll(() => {
//     //some code before all test executions - used not so often

// })
// test afterAll, test afterEach
// test.afterAll
// test.afterEach


// for repetetives we can use hooks like beforEach
// test.beforeEach(async ({page}) => {
//     await page.goto('/')
// })

// test('the first test', async({page}) => {
//     // for all promise use await + async
//     await page.getByText('Form Layouts').click()
// })

// test('the second test', async({page}) => {
//     // for all promise use await + async
//     await page.getByText('Datepicker').click()
// })
test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
// UI is displayed only after we using an action with it
test('Locator syntax rules', async({page}) => {
    // by Tag name
    await page.locator('input').first().click()

    // by ID
    await page.locator('#inputEmail1').click()

    // by Class value
    page.locator('.shape-rectangle')

    // by attribute
    page.locator('[placeholder="Email"]')

    // by Class value(full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    // by tag and attribute and class - no spaces should be in between
    page.locator('input[placeholder="Email"].shape-rectangle')

    // by XPath - to learn more, DO NOT RECOMMENDED
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})


test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    // dedicated attributes for testing, but not user facing locator
    await page.getByTestId('SignIn').click()
    
    await page.getByTitle('IoT Dashboard').click()

})

test('Locating child elements', async({page}) =>{
    // way to find child elements
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    // by chaining locators 1 by 1
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    // chain user facing locator and regular locator 
    await page.locator('nb-card').getByRole('button', {name: "Sign In"}).first().click()
    
    // by using index of the element - try to avoid, because elements position can changed
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent elements', async({page}) =>{
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
    
    await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"})
        .getByRole('textbox', {name: "Email"}).click()

    // Not recommended - go lvl up
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test('Reusing the locators', async({page}) =>{

    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting the values', async({page}) =>{
    // single test value using textContent()
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values using allTextcontents
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    // input field value - check if smth is in the field using inputValue
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    // getting value of exact attribute
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('Assertions', async({page}) =>{
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')
    
    // General assertions/ left to right - not waiting
    const value = 5 
    expect(value).toEqual(5)

    // always check for await
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    // locator assertion - waiting 
    await expect(basicFormButton).toHaveText("Submit")

    // Soft assertion - when test continued execution even if assertion have failed
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})

test('Auto-waiting', async({page}) => {
    // go to Auto awaiting dev playwright
})