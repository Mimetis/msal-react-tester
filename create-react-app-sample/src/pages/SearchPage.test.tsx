import { MsalProvider } from '@azure/msal-react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';


import { MsalReactTester } from 'msal-react-tester';

import SearchPage from './SearchPage';

describe('Search page', () => {

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


  test('Search page render correctly when user is logged in', async () => {

    msalTester.isLogged();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <SearchPage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    await msalTester.waitForRedirect();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalTester.activeAccount.name}` });
    expect(allLoggedInButtons).toHaveLength(2);
   });

  test('Search page render correctly when user logs in automaticaly', async () => {

    msalTester.isNotLogged();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <SearchPage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    await msalTester.waitForLogin();

    let allLoggedInButtons = await screen.findAllByRole('button', { name: `${msalTester.activeAccount.name}` });
    expect(allLoggedInButtons).toHaveLength(2);
  });

  test('Search page render correctly when error is raised', async () => {

    msalTester.isNotLogged();
    msalTester.generateFailure();

    render(
      <MsalProvider instance={msalTester.client}>
        <MemoryRouter>
          <Layout>
            <SearchPage />
          </Layout>
        </MemoryRouter>
      </MsalProvider>,
    );

    await msalTester.waitForLogin();

    expect(screen.getByText(`An Error Occurred: ${msalTester.error.errorCode}`)).toBeInTheDocument();
  });  

});
