import { useMsal } from '@azure/msal-react';
import { Link, Persona, PersonaInitialsColor, PersonaSize, Stack, Text } from '@fluentui/react';
import { apiRequest } from '../msalConfig';


interface ISignProps {
  loginType : 'Popup' | 'Redirect'
}

export const SignInButton :React.FunctionComponent<ISignProps> = (props) => {
  const { instance } = useMsal();

  const handleLogin = (ev: React.MouseEvent<unknown>) => {
    if (props.loginType === "Popup")
    instance.loginPopup(apiRequest);
    else
    instance.loginRedirect(apiRequest);
  };

  return (
    <Link
      onClick={handleLogin}
      styles={{
        root: {
          marginRight: 10,
          textDecoration: 'none',
          selectors: {
            ':hover': {
              textDecoration: 'none',
            },
          },
        },
      }}
    >
      <Stack horizontal verticalAlign={'center'} onClick={() => handleLogin}>
        <Persona size={PersonaSize.size32} initialsColor={PersonaInitialsColor.pink} color="#FFFFFF" />
        <Text styles={{ root: { color: '#ffffff' } }}>Sign In - {props.loginType}</Text>
      </Stack>
    </Link>
  );
};
