# Personal Finance Tracker (Expo + React Native)

Cross-platform (Android + iOS) mobile app for the NE Mobile Practical.

## Architecture and Data Flow

- **Presentation Layer**: `src/screens` and `src/components`
- **Navigation Layer**: `src/navigation/AppNavigator.js` using stack + bottom tabs
- **Data Layer**: `src/services` using `axios` with shared API client
- **State Layer**: `src/context/AuthContext.js` and `src/context/ExpenseContext.js`

Data flow:
1. User action in a screen
2. Screen calls context method
3. Context calls service method (axios)
4. API response updates context state
5. UI re-renders with new data or error message

## Tasks Coverage

- **Task 1** Login with `/users?username={email}` in `AuthContext`
- **Task 2** Create expense with `POST /expenses` in `CreateExpenseScreen`
- **Task 3** Expense detail with `GET /expenses/{id}` in `ExpenseDetailsScreen`
- **Task 4** Expenses list with `GET /expenses` in `ExpenseContext` and `ExpensesListScreen`
- **Task 5** Delete expense with `DELETE /expenses/{id}` in `ExpenseContext`

## API Base URL

`https://67ac71475853dfff53dab929.mockapi.io/api/v1`

## Setup (Expo CLI)

1. Install dependencies:

```bash
npm install
```

2. Start app:

```bash
npx expo start
```

3. Run on device/simulator:
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS)
- Or scan QR code with Expo Go

## Validation and Error Handling

- Email format validation on login
- Required password validation on login
- Positive amount and date format validation on create expense
- Alerts shown for API/network failures and invalid input

## Local Fallback (if MockAPI is unavailable)

A local `db.json` is included.

1. Install json-server:

```bash
npm i -D json-server
```

2. Start local API:

```bash
npx json-server --watch db.json --port 3001
```

3. Update `src/services/api.js` baseURL to:

`http://YOUR_LOCAL_IP:3001`

Use your machine IP (not localhost) when testing on a physical phone.
