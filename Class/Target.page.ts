import {expect, Page, Locator } from "@playwright/test";
import { SelectType_DropDownItemByText } from "../tests/Test/test-form.spec";

export class TargetPage {
    readonly page: Page;
    readonly pageUrl: string;
    pageTitle: string = "";
    readonly pageTitleLocator: Locator;
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly email: Locator;
    readonly company: Locator;
    readonly country: Locator;
    readonly submitButton: Locator;
    readonly thankyouMessage: Locator;
    readonly downloadBroucherForm: Locator;
    readonly primaryRole: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pageTitleLocator = page.locator('//h1');
        this.firstname = page.locator('//input[@name="FirstName"]');
        this.lastname = page.locator('//input[@name="LastName"]');
        this.email = page.locator('//input[@name="Email"]').first();
        this.company = page.locator('//input[@name="Company"]');
        this.country = page.locator('//select[@name="Country"]');
        this.primaryRole = page.locator('//select[@name="Persona__c"]');
        this.submitButton = page.locator('//button[@type="submit"]').first();
        this.thankyouMessage = page.locator('//h1[contains(.,"Thank you for requesting")]');
    }

    async navigateToPage(pageUrl: string) {
        await this.page.goto(pageUrl);
        await this.page.waitForLoadState('networkidle');
    }

    async setPageTitle() {
        await this.pageTitleLocator.waitFor({ state: 'visible' });
        const title = await this.pageTitleLocator.textContent() ?? "";
        const words = title.split(" ");

        this.pageTitle = words[0];

        expect(this.pageTitle.length).toBeGreaterThan(0);
        await this.page.waitForTimeout(1000)
    }

    getPageTitle() {
        return this.pageTitle;
    }


    async broucherOrWhitePaperOrInfographicsOrReportForm() {
        await this.firstname.waitFor({ state: 'visible' });
        await this.firstname.fill('John');
        await this.lastname.fill('Doe');
        await SelectType_DropDownItemByText(this.page, this.country, 'Afghanistan');
        await this.company.fill('Test Company');
    }

    async dataprivacyOrEbookForm() {
        await this.firstname.fill('John');
        await this.lastname.fill('Doe');
        await SelectType_DropDownItemByText(this.page, this.country, 'Afghanistan');
        await SelectType_DropDownItemByText(this.page, this.primaryRole, 'Privacy');
        await this.company.fill('Test Company');
    }

    async fillEmail() {
        await this.email.fill(global.userEmail);
        await this.submitButton.click();
    }


    async verufyFormSubmission() {
        await this.page.waitForLoadState();
        await expect(this.thankyouMessage).toBeVisible({ timeout: 10000 });
        await expect(this.page.locator(`//span[contains(.,"${this.pageTitle}")]`)).toBeVisible({ timeout: 10000 });
    }

}