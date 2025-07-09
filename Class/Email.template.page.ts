import {expect, Page, Locator } from "@playwright/test";

export class EmailPage {
    readonly page: Page;
    readonly pageUrl: string;
    readonly pageTitleLocator: Locator;
    readonly emailInputLocator: Locator;
    readonly OpenEmailLocator: Locator;
    readonly emailSubjectLocator: Locator;
    readonly emailBlockedLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = 'https://temp-mail.io/en';
        this.emailInputLocator = this.page.locator('//input[@data-qa="current-email"]');
        this.OpenEmailLocator = this.page.locator('//li[@data-qa="message"]').first();
        this.emailSubjectLocator = this.page.locator('//h1[@data-qa="message-subject"]');
        this.emailBlockedLocator = this.page.locator('//h1[text()="Sorry, you have been blocked"]');
    }

    async navigateToPage() {
        await this.page.goto(this.pageUrl);
    }

    async setEmail() {
        await this.emailInputLocator.waitFor({ state: 'visible' });
        await this.emailInputLocator.click();
        while ((await this.emailInputLocator.inputValue()).includes('Loading')) {
            // Wait until the email input is empty before setting a new email
            await this.page.waitForTimeout(500);
        }
        global.userEmail = await this.emailInputLocator.inputValue();
    }

    async verifyEmailContent(text: string, Screenshotname: string) {
        await expect(this.emailBlockedLocator, "Email is blocked by server.").toBeHidden(); // Ensure the email is not blocked

        await this.OpenEmailLocator.waitFor({ state: 'visible' });
        await this.OpenEmailLocator.click();

        await this.emailSubjectLocator.waitFor({ state: 'visible' });
        await this.takeScreenshot(Screenshotname);
        const emailSubject = await this.emailSubjectLocator.textContent();
        expect(emailSubject, `Email subject does not contain expected text: ${text}`).toContain(text);

    }

    async takeScreenshot(item_title: string) {
        await this.page.screenshot({ path: `screenshots/email_screenshot-[${item_title}].png` });
        await this.page.waitForTimeout(2000); // Wait for the email content to load
    }

}