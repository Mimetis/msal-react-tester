import { AppBar,  Grid, IconButton, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import * as React from 'react';
import { SignInSignOutButton } from './SignInSignOutButton';

const Header: React.FunctionComponent = (): React.ReactElement => {

  return (
    <AppBar color="primary" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
            <IconButton color="inherit" aria-label="open drawer" edge="start">
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />
          <Grid item>
            <SignInSignOutButton loginType='Redirect' />
            <SignInSignOutButton loginType='Popup' />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
