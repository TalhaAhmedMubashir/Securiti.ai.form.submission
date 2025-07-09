import {Page, Locator } from "@playwright/test";

global.userEmail = ""; // Global variable to store the email


export async function SelectType_DropDownItemByText(
    page: Page,
    Dropdown_Xpath: Locator,
    dropdownvalue: string
) {
    await page.waitForLoadState();
    await Dropdown_Xpath.selectOption(dropdownvalue);
}
