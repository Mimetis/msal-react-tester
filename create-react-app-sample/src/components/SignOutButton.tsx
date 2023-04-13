import { useMsal } from '@azure/msal-react';
import { Avatar, Button, Menu, MenuItem, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect, useState } from 'react';



interface ISignOutProps {
  loginType: 'Popup' | 'Redirect'
}


export const SignOutButton: React.FunctionComponent<ISignOutProps> = (props) => {
  const { instance, accounts } = useMsal();
  const [accountName, setAccountName] = useState<string>();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAccountName(accounts[0].name ?? accounts[0].username);
    }
  }, [accounts]);


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnLogout = () => {
    setAnchorEl(null);
    if (props.loginType === "Popup")
      instance.logoutPopup();
    else
      instance.logoutRedirect();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (

    <>
      <Button onClick={handleClick}>
        <Avatar sx={{ bgcolor: green[500] }} />
        <Typography color="white" variant="caption" sx={{ pl: 2 }}>{accountName}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOnLogout}>Log out - {props.loginType}</MenuItem>
      </Menu>
    </>

  );
};
