import { act, render, screen } from '@testing-library/react';
import { MsalProvider } from '@azure/msal-react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from './HomePage';

import { MsalReactTester } from 'msal-react-tester';

const actAwait = async (interval?: number): Promise<void> => {
  let awaiter = (interval?: number): Promise<void> => new Promise((r, s) => setTimeout(r, interval));
  return act(async () => await awaiter(interval));
}

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

    await msalTester.isNotLogged();
    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );
    // await actAwait(100);
    await msalTester.waitForRedirect();
    expect(screen.getByText(/Please sign-in/)).toBeInTheDocument();
  });

  test('Home page render correctly when user is logged in', async () => {

    await msalTester.isLogged();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    // await actAwait(100);
    await msalTester.waitForRedirect();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalTester.activeAccount.name}` });
    expect(allLoggedInButtons).toHaveLength(2);
  });

  test('Home page render correctly when user logs in using redirect', async () => {

    await msalTester.isNotLogged();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    // await actAwait(100);
    await msalTester.waitForRedirect();

    let signin = await screen.findByRole('button', { name: 'Sign In - Redirect' });
    userEvent.click(signin);

    await msalTester.waitForLogin();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalTester.activeAccount.name}` });
    expect(allLoggedInButtons).toHaveLength(2);
  });

  test('Home page render correctly when user logs in using popup', async () => {

    // Using a new msalTester with popup
    let msalPopupTester = new MsalReactTester("Popup");
    msalPopupTester.spyMsal();

    await msalPopupTester.isNotLogged();

    render(
      <MsalProvider instance={msalPopupTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    // await actAwait(100);
    await msalPopupTester.waitForRedirect();

    let signin = await screen.findByRole('button', { name: 'Sign In - Popup' });
    userEvent.click(signin);

    await msalPopupTester.waitForLogin();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalPopupTester.activeAccount.name}` });
    expect(allLoggedInButtons).toHaveLength(2);
  });

  test('Home page render correctly when user logs out', async () => {

    msalTester.isLogged();
    const user = userEvent.setup()

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <HomePage />
          </Layout>
        </MemoryRouter>
      </MsalProvider >,
    );

    // await actAwait(100);
    await msalTester.waitForRedirect();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalTester.activeAccount.name}` });
    user.click(allLoggedInButtons[0]);

    // once clicked on user name, menuitem is appearing
    const signout = await screen.findByRole('menuitem', { name: 'Log out - Redirect' });

    // click on logout
    user.click(signout);

    // wait for logout
    // await actAwait(100);
    await msalTester.waitForLogout();

    expect(screen.getByText(/Please sign-in/)).toBeInTheDocument();
  });

  test('Home page render correctly when error is raised', async () => {

    await msalTester.isNotLogged();

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

    // await actAwait(100);
    await msalTester.waitForRedirect();

    let signin = await screen.findByRole('button', { name: 'Sign In - Redirect' });
    userEvent.click(signin);

    await msalTester.waitForLogin();

    expect(screen.getByText(/Please sign-in/)).toBeInTheDocument();
  });
});
