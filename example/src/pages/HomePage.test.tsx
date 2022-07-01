import { initializeIcons } from '@fluentui/react';

// import { MsalProvider } from '@azure/msal-react';
import { render, screen } from '@testing-library/react';
import { MsalProvider } from '@azure/msal-react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from './HomePage';

import { MsalReactTester } from 'msal-react-tester';



initializeIcons();


describe('Home page', () => {

  let msalTester: MsalReactTester;
  beforeEach(() => {
    // new instance of msal tester for each test
    msalTester = new MsalReactTester();

    // spy all required msal things
    msalTester.spyMsal();
  });

  afterEach(() => {
    msalTester.resetSpyMsal();
  });

  test('Home page render correctly when user is logged out', async () => {

    msalTester.isNotLogged();
    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    await msalTester.waitForRedirect();
    expect(screen.getByText(/Please sign-in/)).toBeInTheDocument();
  });

  test('Home page render correctly when user is logged in', async () => {

    msalTester.isLogged();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    await msalTester.waitForRedirect();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalTester.activeAccount.name}` });
    expect(allLoggedInButtons).toHaveLength(2);
  });

  test('Home page render correctly when user logs in using redirect', async () => {

    msalTester.isNotLogged();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    await msalTester.waitForRedirect();

    let signin = screen.getByRole('button', { name: 'Sign In - Redirect' });
    userEvent.click(signin);

    await msalTester.waitForLogin();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalTester.activeAccount.name}` });
    expect(allLoggedInButtons).toHaveLength(2);
  });

  test('Home page render correctly when user logs in using popup', async () => {

    // Using a new msalTester with popup
    let msalPopupTester = new MsalReactTester("Popup");
    msalPopupTester.spyMsal();

    msalPopupTester.isNotLogged();

    render(
      <MsalProvider instance={msalPopupTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    await msalPopupTester.waitForRedirect();

    let signin = screen.getByRole('button', { name: 'Sign In - Popup' });
    userEvent.click(signin);

    await msalPopupTester.waitForLogin();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalPopupTester.activeAccount.name}` });
    expect(allLoggedInButtons).toHaveLength(2);
  });

  test('Home page render correctly when user logs out', async () => {

    msalTester.isLogged();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider >,
    );

    await msalTester.waitForRedirect();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalTester.activeAccount.name}` });
    userEvent.click(allLoggedInButtons[0]);

    // once clicked on user name, menuitem is appearing
    const signout = screen.getByRole('menuitem', { name: 'Sign Out - Redirect' });

    // click on logout
    userEvent.click(signout, undefined, { skipPointerEventsCheck: true });

    // wait for logout
    await msalTester.waitForLogout();

    expect(screen.getByText(/Please sign-in/)).toBeInTheDocument();
  });

  test('Home page render correctly when error is raised', async () => {

    msalTester.isNotLogged();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    msalTester.generateFailure();

    await msalTester.waitForRedirect();

    let signin = screen.getByRole('button', { name: 'Sign In - Redirect' });
    userEvent.click(signin);

    await msalTester.waitForLogin();

    expect(screen.getByText(/Please sign-in/)).toBeInTheDocument();
  });
});
