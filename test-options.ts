import { test as base, Page} from '@playwright/test'
import {PageManager} from '../pw-practice-app/page-objects/pageManager'

export type Testoptions = {
    globalsQaUrl: string
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<Testoptions>({
    globalsQaUrl: ['', {option: true}],

    formLayoutsPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        //auto: true means - formsLayoutsPage fixture should be auto initialized as 1st thing when we ran the test
    },

    // Page object is responsible for all of our Objects
    // Creating a dependency between fixtures pageManager: async({page, formLayoutsPage}, use) => {
    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})