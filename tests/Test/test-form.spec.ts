import { Browser, BrowserContext, chromium, expect, Page, test, Locator } from "@playwright/test";
import { mkdirSync } from 'fs';
import { TargetPage } from "../../Class/Target.page";
import { EmailPage } from "../../Class/Email.template.page";
mkdirSync('screenshots', { recursive: true });

let browser: Browser;
let context: BrowserContext;
let page: Page;

let targetPage: TargetPage;
let emailpage: EmailPage;
const pageUrl = ["https://securiti.ai/brochures/gencore-ai/", "https://securiti.ai/ebooks/data-privacy-laws-in-us/", "https://securiti.ai/whitepapers/2025-privacy-law-updates-key-developments/",
    "https://securiti.ai/infographics/kenya-data-protection-act/", "https://securiti.ai/reports/securiti-named-a-leader-in-data-access-governance/"]


test.beforeAll("Setup", async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    targetPage = new TargetPage(page);
})

test.describe("Securiti.AI Page", () => {
    test("Broucher Page Submit Form", async () => {
        await targetPage.navigateToPage(pageUrl[0]);

        const newTab = await context.newPage();
        await newTab.bringToFront();

        emailpage = new EmailPage(newTab);

        await emailpage.navigateToPage();

        await emailpage.setEmail();

        await page.bringToFront();

        await targetPage.setPageTitle();

        await targetPage.broucherOrWhitePaperOrInfographicsOrReportForm();

        await targetPage.fillEmail()

        await page.waitForTimeout(5000); // Wait for the form submission to complete

        await targetPage.verufyFormSubmission();

        await newTab.bringToFront();

        await emailpage.verifyEmailContent(targetPage.getPageTitle(), "Broucher Page");

    })
    test("Ebook Page Submit Form", async () => {
        await targetPage.navigateToPage(pageUrl[1]);

        const newTab = await context.newPage();

        await newTab.bringToFront();

        emailpage = new EmailPage(newTab);

        await emailpage.navigateToPage();

        await emailpage.setEmail();


        await page.bringToFront();

        await targetPage.setPageTitle();

        await targetPage.dataprivacyOrEbookForm();

        await targetPage.fillEmail()

        await page.waitForTimeout(5000); // Wait for the form submission to complete

        await targetPage.verufyFormSubmission();

        await newTab.bringToFront();

        await emailpage.verifyEmailContent(targetPage.getPageTitle(), "Ebook Page");

    })
    test("Whitepapers Page Submit Form", async () => {
        await targetPage.navigateToPage(pageUrl[2]);

        const newTab = await context.newPage();

        await newTab.bringToFront();

        emailpage = new EmailPage(newTab);

        await emailpage.navigateToPage();

        await emailpage.setEmail();


        await page.bringToFront();

        await targetPage.setPageTitle();

        await targetPage.broucherOrWhitePaperOrInfographicsOrReportForm();

        await targetPage.fillEmail()

        await page.waitForTimeout(5000); // Wait for the form submission to complete

        await targetPage.verufyFormSubmission();

        await newTab.bringToFront();

        await emailpage.verifyEmailContent(targetPage.getPageTitle(), "Whitepapers Page");

    })
    test("Infographics Page Submit Form", async () => {
        await targetPage.navigateToPage(pageUrl[3]);

        const newTab = await context.newPage();

        await newTab.bringToFront();

        emailpage = new EmailPage(newTab);

        await emailpage.navigateToPage();

        await emailpage.setEmail();


        await page.bringToFront();

        await targetPage.setPageTitle();

        await targetPage.broucherOrWhitePaperOrInfographicsOrReportForm();

        await targetPage.fillEmail()

        await page.waitForTimeout(5000); // Wait for the form submission to complete

        await targetPage.verufyFormSubmission();

        await newTab.bringToFront();

        await emailpage.verifyEmailContent(targetPage.getPageTitle(), "Infographics Page");

    })
    test("Report Page Submit Form", async () => {
        await targetPage.navigateToPage(pageUrl[4]);

        const newTab = await context.newPage();

        await newTab.bringToFront();

        emailpage = new EmailPage(newTab);

        await emailpage.navigateToPage();

        await emailpage.setEmail();


        await page.bringToFront();

        await targetPage.setPageTitle();

        await targetPage.broucherOrWhitePaperOrInfographicsOrReportForm();

        await targetPage.fillEmail()

        await page.waitForTimeout(5000); // Wait for the form submission to complete

        await targetPage.verufyFormSubmission();

        await newTab.bringToFront();

        await emailpage.verifyEmailContent(targetPage.getPageTitle(), "Report Page");

    })
});

test.afterAll(async () => {
    await browser.close();
})