import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

interface ISignInSignOutProps {
  loginType: 'Popup' | 'Redirect'
}

export const SignInSignOutButton: React.FunctionComponent<ISignInSignOutProps> = (props) => {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <SignOutButton loginType={props.loginType} />;
  } else if (inProgress !== InteractionStatus.Startup && inProgress !== InteractionStatus.HandleRedirect) {
    // inProgress check prevents sign-in button from being displayed briefly after returning from a redirect sign-in. Processing the server response takes a render cycle or two
    return <SignInButton loginType={props.loginType} />;
  } else {
    return null;
  }
};
