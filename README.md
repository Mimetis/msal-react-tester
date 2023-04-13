# msal-react-tester. A tester package when using msal-react in your application

## About

The [MSAL React Tester](https://www.npmjs.com/package/msal-react-tester) is a NPM package to allows you creating **unit tests** for any of your components that need to be authenticated (or not) using the `msal-react` package and [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview).


The **MSAL React Tester** package is able to run by default with different javascript test runners like:
- [vitest](https://vitest.dev/) if you are creating a React application using [vite](https://vitejs.dev/).
- [jest](https://jestjs.io/) if you are creating a React application using [Create React Application](https://create-react-app.dev/).

The **MSAL React Tester** package allows you to test your components in any of these scenario:
- Testing a react component when a user "**is not**" authenticated.
- Testing a react component when a user "**is**" authenticated.
- Testing a react component when a user "**tries**" to log in.
- Testing a react component when a user "**tries**" to log out.
- Testing a react component when a user authentication request has "**failed**". 

## Prerequisites

* You are building a react application using [Create React Application](https://create-react-app.dev/) or [vite](https://vitejs.dev/).
* You are using `@azure/msal-react` to authenticate your users on [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview).
* You are using the built in `@testing-library/react` package to create and run your tests (you are basically using the built in `"test": "react-scripts test"` script to execute your tests).
* You want to create unit tests without having to depends on a connection to [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview).
* You want to run your tests in your **CI/CD**.

## Installation

The **MSAL React Tester** package is available on [NPM](https://www.npmjs.com/).

``` bash
npm install --save-dev msal-react-tester
```

### vitest

 If you are using the [vitest](https://vitest.dev/) test runner, you need to add this to your config 

 ``` ts
import { MsalReactTesterPlugin } from 'msal-react-tester'
import { vi, expect } from 'vitest'

MsalReactTesterPlugin.init({
  spyOn: vi.spyOn,
  expect: expect,
  resetAllMocks: vi.resetAllMocks
})
```

If you are using [jest](https://jestjs.io/) this step is not necessary.

## Usage

Creates a `[component].test.tsx` and import the msal-react-tester package:

``` ts
import { MsalReactTester } from 'msal-react-tester';
```

### Initialization:

- Create a new instance of `MsalReactTester` before each test.
  - Depending on your setup, you can create your instance to mock a **Redirect authentication** or a **Popup authentication**.
- Call the `spyMsal()` method to mock all the MSAL React required methods & events.
- Don not forget to call `resetSpyMsal` after each test.

``` ts
let msalTester: MsalReactTester;

beforeEach(() => {
  // new instance of msal tester for each test:
  msalTester = new MsalReactTester(); 
  // or new MsalReactTester("Redirect") / new MsalReactTester("Popup")

  // Ask msal-react-tester to handle and mock all msal-react processes:
  msalTester.spyMsal();
});

afterEach(() => {
  // reset msal-react-tester
  msalTester.resetSpyMsal();
});
```

### Testing a component without any interaction with the authentication process:

In each of your test, you can now:
- Mock an unauthenticated user, calling `await msalTester.isNotLogged()`.
- Mock an authenticated user, calling `await msalTester.isLogged()`.
- Creates a `<MsalProvider />` using the `msalTester.client` as the `IPublicClientApplication` instance.
- Call `msalTester.waitForRedirect()` to let **MSAL React Tester** handling **MSAL React** processes
- Then makes any tests or assertions.

Here is an example where we are testing a `<HomePage />` component during a first visit by an authenticated user:

``` ts
test('Home page render correctly when user is not logged', async () => {

  // Mock a guest user, not yet authenticated:
  await msalTester.isNotLogged();

  // Render the <HomePage /> component using a <MsalProvider /> 
  // with the mock IPublicClientApplication instance:
  render(
    <MsalProvider instance={msalTester.client}>
      <MemoryRouter>
        <Layout>
          <HomePage />
        </Layout>
      </MemoryRouter>
    </MsalProvider>,
  );
  
  // Wait for msal-react-tester to handle events from msal-react:
  await msalTester.waitForRedirect();

  // Test your <HomePage /> component:
  expect(screen.getByText(/Please sign-in/)).toBeInTheDocument();
});

```

On the other side, you can test the same component assuming your user is "_already logged_", using `await msalTester.isLogged()`.

### Testing a component during an authentication process:

If you want to test a component during the authentication process, you can use `await msalTester.waitForLogin()`:

``` ts
test('Home page render correctly when user logs in', async () => {

  // Mock a guest user, not yet authenticated:
  await msalTester.isNotLogged();

  // Render the <HomePage /> component using a <MsalProvider /> 
  // with the mock IPublicClientApplication instance:
  render(
    <MsalProvider instance={msalTester.client}>
      <MemoryRouter>
        <Layout>
          <HomePage />
        </Layout>
      </MemoryRouter>
    </MsalProvider>,
  );

  // Wait for msal-react-tester to handle events from msal-react:
  await msalTester.waitForRedirect();

  // Getting the log in button.
  // Mock a user click to launch the log in process:
  const signin = screen.getByRole('button', { name: 'Sign In' });
  userEvent.click(signin);

  // Wait for msal-react-tester to handle the login process from msal-react:
  await msalTester.waitForLogin();

  // From here, your user is supposed to be logged in the component:
  expect(screen.getByRole('button', 
    { name: msalTester.activeAccount.name })).toBeInTheDocument();
});
```

On the other side, if you want to test component during a log out process, use `msalTester.waitForLogout()`

## Example

You will find a full example in the `../example` folder.

Take a look on the pages tests:

```
root
├── example
├──── src
├────── pages
├──────── HomePage.test.tsx
├──────── SearchPage.test.tsx

```

## License

Licensed under the MIT License.

## Contact

Feel free to contact me through twitter : [@sebpertus](https://twitter.com/sebpertus)