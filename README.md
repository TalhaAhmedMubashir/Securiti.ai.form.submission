# 📄 Securiti.ai Form Submission Automation with Playwright

> ⚠️ **Disclaimer**: This repository is created **strictly for educational and internal testing purposes**. It is **not affiliated with, endorsed by, or officially connected to Securiti.ai** or any of its services. The automation interacts with publicly available web pages, and no confidential or private data is used or stored.

This project automates the testing of form submissions across various [Securiti.ai](https://securiti.ai) resources (e.g., Brochures, Ebooks, Whitepapers, Infographics, and Reports), and verifies confirmation emails using a temporary email service.

---

## 🚀 Features

* Automates form submissions on Securiti.ai resources.
* Uses [Temp-Mail](https://temp-mail.io/en) to generate and verify email confirmation.
* Captures screenshots of confirmation emails.
* Implements reusable Playwright classes for actions and utilities.
* Automatically validates success messages after form submission.

---

## 📦 Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v16+ recommended)
* [npm](https://www.npmjs.com/)
* [Playwright Test](https://playwright.dev/test)

---

## 🛠️ Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/TalhaAhmedMubashir/securiti.ai.test
   cd securiti-form-tester
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright Browsers**

   ```bash
   npx playwright install
   ```

---

## ▶️ Running the Tests

To execute all tests:

```bash
npx playwright test
```

The tests will:

* Navigate to specific Securiti.ai resources
* Submit each form using a temporary email
* Wait for and validate the confirmation email
* Save email screenshots to the `screenshots` directory

---

## 📂 Project Structure

```
.
├── Class/
│   ├── Email.template.page.ts             # Temp-mail email inbox handling
│   └── Target.page.ts                     # Handles target form page interactions
├── tests/
│   └── securiti-form-submission.spec.ts   # Main test script
├── screenshots/                           # Stores email confirmation screenshots
├── package.json
├── playwright.config.ts                   # Optional Playwright config
└── README.md
```

---

## 📸 Screenshots

Confirmation emails are saved to:

```
screenshots/email_screenshot-[PAGE_TITLE].png
```

---

## 🧪 Test Coverage

* ✅ Brochure Form
* ✅ Ebook Form
* ✅ Whitepaper Form
* ✅ Infographics Form
* ✅ Report Form

---

## 📌 Notes

* `global.userEmail` is dynamically generated and reused across form and email contexts.
* XPath selectors are used for precise targeting — update them if the website’s structure changes.
* No real or sensitive user data is used.

---

## 🧹 Cleanup

The browser closes automatically after all tests using the `afterAll` hook.

---

## 🙋 Need Help?

If you encounter issues, feel free to open an issue or submit a PR!

