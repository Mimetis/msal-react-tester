import { useMsal } from '@azure/msal-react';
import { Avatar, Button, Typography } from '@mui/material';
import { apiRequest } from '../msalConfig';


interface ISignProps {
  loginType: 'Popup' | 'Redirect'
}

export const SignInButton: React.FunctionComponent<ISignProps> = (props) => {
  const { instance } = useMsal();

  const handleLogin = (ev: React.MouseEvent<unknown>) => {
    if (props.loginType === "Popup")
      instance.loginPopup(apiRequest);
    else
      instance.loginRedirect(apiRequest);
  };

  return (
    <>
        
      <Button onClick={handleLogin}>
      <Avatar /> <Typography color="white" variant="caption" sx={{ pl: 2 }}>Sign In - {props.loginType}</Typography>
      </Button>
    </>
  );
};
