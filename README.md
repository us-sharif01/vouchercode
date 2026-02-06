# VoucherCodes Cypress Tests

This project contains Cypress tests that automate searching for local restaurant offers on `www.vouchercodes.co.uk`.

## Requirements
- Node.js 18+ (or any version supported by the current Cypress release)
- npm

## Install
```bash
npm install
```

## Run Tests (Headless)
```bash
npm run cy:run
```

## Open Cypress UI
```bash
npm run cy:open
```

## Tests
- Success flow: searches for local restaurant offers in London for a given party size.
- Failure flow: intentionally fails to produce screenshots/video for debugging.
