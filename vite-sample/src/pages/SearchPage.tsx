import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { Stack, Text } from '@fluentui/react';
import * as React from 'react';
import { ErrorComponent } from '../components/ErrorComponent';
import { LoadingComponent } from '../components/LoadingComponent';
import { apiRequest } from '../msalConfig';


const SearchPage: React.FunctionComponent = (props) => {

  return (
    <Stack tokens={{ childrenGap: 20, padding: 10 }}>

      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={apiRequest}
        errorComponent={ErrorComponent}
        loadingComponent={LoadingComponent}
      >
        <Stack
          tokens={{ childrenGap: 20, padding: 10 }}
          horizontalAlign="center"
          style={{
            background: 'transparent',
          }}
        >
          <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center" verticalAlign="center" style={{ height: '80vh' }}>
            <Text variant="xLargePlus">Good to See You here</Text>
          </Stack>
        </Stack>
      </MsalAuthenticationTemplate>
    </Stack>
  );
};

export default SearchPage;
