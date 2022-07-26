import { IPublicClientApplication, Logger, LogLevel, AccountInfo, EventCallbackFunction, AuthenticationResult, EventMessage, EventType, InteractionType, AuthError } from '@azure/msal-browser';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { getTestRunner, ITestRunner } from './MsalReactTesterPlugin';
import { defaultTestAccountInfo, defaultTestAuthenticationResult, defaultTestAuthError, } from './testerConstants';
/**
 * msal-react tester. Useful to tests your components requiring to be logged in, using msal-react
 * @example
 *   
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

  test('Home page render correctly when user is not logged', async () => {
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

 */
class MsalReactTester {

  private _eventCallbacks: EventCallbackFunction[] = [];
  private _handleRedirectSpy: any;
  private _loginRedirectSpy: any;
  private _loginPopupSpy: any;
  private _logoutRedirectSpy: any;
  private _logoutPopupSpy: any;
  private _testAccountInfo: AccountInfo;
  private _testAuthenticationResult: AuthenticationResult;
  private _testRunner: ITestRunner

  client: IPublicClientApplication;
  accounts: AccountInfo[] = [];
  activeAccount: AccountInfo | null = null;
  error: AuthError;

  /**
   * Create a new mock IPublicClientApplication instance
   * @param testAccountInfo test account you want to use. A default is created if null
   * @param testAuthenticationResult test authentication result you want to use . A default is created is null
   */
  constructor(public interationType: 'Redirect' | 'Popup' = 'Redirect', testAccountInfo = defaultTestAccountInfo,
    testAuthenticationResult = defaultTestAuthenticationResult,
    testAuthError = defaultTestAuthError) {

    this._testRunner = getTestRunner();

    console.error(this._testRunner.spyOn);
    if (this._testRunner.spyOn === undefined) {
      
      throw new Error('test runner seems to not be correctly configured');
    }
    
    this._testAccountInfo = testAccountInfo;
    this._testAuthenticationResult = testAuthenticationResult;

    this.error = testAuthError;
    this.client = MsalReactTester.GetNewClient(testAccountInfo, testAuthenticationResult)
  }

  /**
   * Initialize the IPublicClientApplication with an active account.
   */
  isLogged() {
    this.accounts = [this._testAccountInfo];
    this.activeAccount = this._testAccountInfo;
  }

  /**
   * Initialize the IPublicClientApplication with no active account
   */
  isNotLogged() {

    this.accounts = [];
    this.activeAccount = null;
  }

  /**
   * Reset all spy / mocks. Should be used in `afterEach` call:
   * 
   *  @example
   *  afterEach(() => {
   *   msalTester.resetSpyMsal();
   * });
   */
  resetSpyMsal() {
    this._testRunner.resetAllMocks();
    this.accounts = [];
    this.activeAccount = null;
    this._eventCallbacks = [];
  }

  /**
   * Wait for login process to be done
   */
  async waitForLogin() {
    await waitFor(() => this._testRunner.expect(this._handleRedirectSpy).toHaveBeenCalledTimes(1));
    if (this.interationType === 'Redirect')
      await waitFor(() => this._testRunner.expect(this._loginRedirectSpy).toHaveBeenCalledTimes(1));
    else
      await waitFor(() => this._testRunner.expect(this._loginPopupSpy).toHaveBeenCalledTimes(1));
  }

  /**
   * Wait for redirect handled by MSAL to be done
   */
  async waitForRedirect() {
    await waitFor(() => this._testRunner.expect(this._handleRedirectSpy).toHaveBeenCalledTimes(1));
  }

  /**
   * Wait for logout process to be done
   */
  async waitForLogout() {
    await waitFor(() => this._testRunner.expect(this._handleRedirectSpy).toHaveBeenCalledTimes(1));

    if (this.interationType === 'Redirect')
      await waitFor(() => this._testRunner.expect(this._logoutRedirectSpy).toHaveBeenCalledTimes(1));
    else
      await waitFor(() => this._testRunner.expect(this._logoutPopupSpy).toHaveBeenCalledTimes(1));
  }

  /**
  * Spy and Mocks required MSAL things. Should be used in `beforeEach` call:
  * 
  *  @example
  *    let msalTester: MsalReactTester;
       beforeEach(() => {
         // new instance of msal tester for each test
         msalTester = new MsalReactTester();
         // spy all required msal things
         msalTester.spyMsal();
       });
  * });
  */
  spyMsal() {
    let eventId = 0;
    this._testRunner.spyOn(this.client, 'addEventCallback').mockImplementation((callbackFn: any) => {
      this._eventCallbacks.push(callbackFn);
      eventId += 1;
      return eventId.toString();
    });

    // send a message to say "hey we made redirect start then end"
    this._handleRedirectSpy = this._testRunner.spyOn(this.client, 'handleRedirectPromise').mockImplementation(() => {

      const eventStart: EventMessage = {
        eventType: EventType.HANDLE_REDIRECT_START,
        interactionType: InteractionType.Redirect,
        payload: null,
        error: null,
        timestamp: 10000,
      };

      
      this._eventCallbacks.forEach((callback) => {
         callback(eventStart);
      });


      const eventEnd: EventMessage = {
        eventType: EventType.HANDLE_REDIRECT_END,
        interactionType: InteractionType.Redirect,
        payload: null,
        error: null,
        timestamp: 10000,
      };

      this._eventCallbacks.forEach(async (callback) => {
        callback(eventEnd)
      });

      return Promise.resolve(null);
    });

    this._loginRedirectSpy = this._testRunner.spyOn(this.client, 'loginRedirect').mockImplementation(async (request) => {

      this.accounts = [this._testAccountInfo];
      this.activeAccount = this._testAccountInfo;

      const eventMessage: EventMessage = {
        eventType: EventType.LOGIN_SUCCESS,
        interactionType: InteractionType.Redirect,
        payload: this._testAuthenticationResult,
        error: null,
        timestamp: 10000,
      };

      this._eventCallbacks.forEach((callback) => {
        callback(eventMessage);
      });

      return Promise.resolve();
    });

    this._loginPopupSpy = this._testRunner.spyOn(this.client, "loginPopup").mockImplementation(async (request) => {

      this.accounts = [this._testAccountInfo];
      this.activeAccount = this._testAccountInfo;

      const eventMessage: EventMessage = {
        eventType: EventType.LOGIN_SUCCESS,
        interactionType: InteractionType.Popup,
        payload: this._testAuthenticationResult,
        error: null,
        timestamp: 10000
      };

      this._eventCallbacks.forEach((callback) => {
        callback(eventMessage);
      });

      return Promise.resolve(this._testAuthenticationResult);
    });

    this._logoutRedirectSpy = this._testRunner.spyOn(this.client, 'logoutRedirect').mockImplementation(async (request) => {
      this.accounts = [];
      this.activeAccount = null;

      const eventMessage: EventMessage = {
        eventType: EventType.LOGOUT_SUCCESS,
        interactionType: InteractionType.Redirect,
        payload: this._testAuthenticationResult,
        error: null,
        timestamp: 10000,
      };

      this._eventCallbacks.forEach((callback) => {
        callback(eventMessage);
      });

      return Promise.resolve();

    });

    this._logoutPopupSpy = this._testRunner.spyOn(this.client, 'logoutPopup').mockImplementation(async (request) => {
      this.accounts = [];
      this.activeAccount = null;

      const eventMessage: EventMessage = {
        eventType: EventType.LOGOUT_SUCCESS,
        interactionType: InteractionType.Popup,
        payload: this._testAuthenticationResult,
        error: null,
        timestamp: 10000,
      };

      this._eventCallbacks.forEach((callback) => {
        callback(eventMessage);
      });

      return Promise.resolve();

    });

    this._testRunner.spyOn(this.client, 'getAllAccounts').mockImplementation(() => this.accounts);
    this._testRunner.spyOn(this.client, 'getActiveAccount').mockImplementation(() => this.activeAccount);
    this._testRunner.spyOn(this.client, 'setActiveAccount').mockImplementation((account) => (this.activeAccount = account));
  }


  generateFailure() { 

    if (this.interationType === 'Redirect') {

      if (this._loginRedirectSpy)
        this._loginRedirectSpy.mockClear();

      this._loginRedirectSpy = this._testRunner.spyOn(this.client, 'loginRedirect').mockImplementation(async (request) => {

        const eventMessage: EventMessage = {
          eventType: EventType.LOGIN_FAILURE,
          interactionType: InteractionType.Redirect,
          payload: null,
          error: this.error,
          timestamp: 10000,
        };

        this._eventCallbacks.forEach((callback) => {
          callback(eventMessage);
        });

        return Promise.resolve();
      });
    }
    else {

      if (this._loginPopupSpy)
        this._loginPopupSpy.mockClear();

      this._loginPopupSpy = this._testRunner.spyOn(this.client, "loginPopup").mockImplementation(async () => {
        const eventMessage: EventMessage = {
          eventType: EventType.LOGIN_FAILURE,
          interactionType: InteractionType.Popup,
          payload: null,
          error: this.error,
          timestamp: 10000
        };

        this._eventCallbacks.forEach((callback) => {
          callback(eventMessage);
        });

        return Promise.resolve(null);
      });
    }
  }


  static GetNewClient = (testAccountInfo: AccountInfo, testAuthenticationResult: AuthenticationResult): IPublicClientApplication => {
    let logger = new Logger({
      loggerCallback: (_level: LogLevel, _message: string, _containsPii: boolean) => { },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Error,
      correlationId: 'mock_test',
    });

    return {
      initialize: () => Promise.resolve(),
      acquireTokenPopup: () => Promise.resolve(testAuthenticationResult),
      acquireTokenRedirect: () => Promise.resolve(),
      acquireTokenSilent: () => Promise.resolve(testAuthenticationResult),
      acquireTokenByCode: () => Promise.resolve(testAuthenticationResult),
      getAllAccounts: () => [testAccountInfo],
      getAccountByHomeId: () => testAccountInfo,
      getAccountByUsername: () => testAccountInfo,
      getAccountByLocalId: () => testAccountInfo,
      handleRedirectPromise: () => Promise.resolve(testAuthenticationResult),
      loginPopup: () => Promise.resolve(testAuthenticationResult),
      loginRedirect: () => Promise.resolve(),
      logout: () => Promise.resolve(),
      logoutRedirect: () => Promise.resolve(),
      logoutPopup: () => Promise.resolve(),
      ssoSilent: () => Promise.resolve(testAuthenticationResult),
      addEventCallback: () => null,
      removeEventCallback: () => { return },
      addPerformanceCallback: () => '',
      removePerformanceCallback: () => false,
      enableAccountStorageEvents: () => { return },
      disableAccountStorageEvents: () => { return },
      getTokenCache: () => null,
      setLogger: () => { return },
      setActiveAccount: () => { return },
      getActiveAccount: () => testAccountInfo,
      initializeWrapperLibrary: () => { return },
      setNavigationClient: () => { return },
      getLogger: () => logger,
      getConfiguration: () => null,
    };
  };


}


export default MsalReactTester;