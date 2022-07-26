import { InteractionStatus } from '@azure/msal-browser';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Stack, Text } from '@fluentui/react';
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
    <Stack tokens={{ childrenGap: 20, padding: 10 }}>
      <AuthenticatedTemplate>
        <Stack tokens={{ childrenGap: 20, padding: 10 }} horizontalAlign="center" style={{ background: 'transparent' }}>
          <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center" verticalAlign="center" style={{ height: '80vh' }}>
            <Text variant="xLargePlus">Good to See You here</Text>
          </Stack>
        </Stack>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <UnauthenticatedComponent />
      </UnauthenticatedTemplate>
    </Stack>
  );
};

export default HomePage;
