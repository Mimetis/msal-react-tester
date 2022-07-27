import { InteractionStatus } from '@azure/msal-browser';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { LoadingComponent } from '../components/LoadingComponent';
import UnauthenticatedComponent from '../components/UnauthenticatedComponent';


const HomePage: React.FunctionComponent = (props) => {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();


  if (!isAuthenticated && inProgress !== InteractionStatus.None) {
    return (
      <LoadingComponent />
    );
  }

  return (
    <Box>
      <AuthenticatedTemplate>
        <Box>
          <Typography color="inherit" variant="h5" component="h1">
            Good to See You here
            </Typography>
        </Box>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <UnauthenticatedComponent />
      </UnauthenticatedTemplate>
    </Box>
  );
};

export default HomePage;
