# Cypress Login Test Automation 🤖

This project is an automated test suite for **SauceDemo Login functionality** using **Cypress**. The tests validate both successful and unsuccessful login attempts with various user credentials. The suite supports **headless** and **headed** execution modes for flexible testing. 🌐

## Table of Contents 🔥

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
  - [Headless Mode](#headless-mode)
  - [Headed Mode](#headed-mode)
- [Features](#features)

## Installation 📦

### 1. Clone the Repository 👨‍👨‍👦

- Create a project folder in your preferred directory and navigate into it:

```bash
mkdir Cypress-Project && cd Cypress-Project
```

- Clone the repository from GitHub:

```bash
git clone https://github.com/allanners/cypress_trial.git
cd cypress_trial
```

### 2. Install Dependencies 😱

- Run the following command ton install Cypress and other required dependencies:

```bash
npm install
```
- Ensure that all dependencies are properly installed by running:

```bash
npm list
```

### 3. Verify Cypress Installation ✅

- Open Cypress to confirm the installation is successful:

```bash
npx cypress open
```

- If Cypress does not open, try running:

```bash
npx cypress verify
```

## Running the Tests 👨‍🦽‍➡️

The test suite contains login validation tests that can be executed in both **headless** and **headed** modes.

### Headless Mode 🧑‍💻 (Without Browser UI)

1. Run the login test in headless mode:

```bash
npx cypress run --spec cypress/e2e/login.cy.js
```

### Headed Mode 🖥️ (With Browser UI)

1. Run the login test in headed mode:

```bash
npx cypress open
```
Then, select **login.cy.js** in the Cypress Test Runner.

## Features 😎

- **Valid Login Test**: Ensures that users can log in using correct credentials (`standard_user`).
- **Invalid Login Test**: Verifies that users cannot log in with non-existing credentials.
- **Assertions**: Checks for error messages and UI visibility.
- **Flexible Test Execution**: Runs in **headless** for speed or **headed** for debugging.
