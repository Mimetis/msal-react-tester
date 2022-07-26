import { Stack, Text } from '@fluentui/react';
import * as React from 'react';

interface IUnauthenticatedComponentProps { }

const UnauthenticatedComponent: React.FunctionComponent<IUnauthenticatedComponentProps> = (props) => {
  return (
    <Stack tokens={{ childrenGap: 10 }} horizontal horizontalAlign="center" verticalAlign="center" style={{ height: '80vh' }}>
      <Text variant="xLargePlus">Please sign-in.</Text>
    </Stack>
  );
};

export default UnauthenticatedComponent;
