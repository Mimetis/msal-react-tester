import { MsalAuthenticationResult } from "@azure/msal-react";
import { Stack, Text } from "@fluentui/react";

export const ErrorComponent: React.FC<MsalAuthenticationResult> = ({ error }) => {

  return <Stack tokens={{ childrenGap: 10 }} horizontal horizontalAlign="center" verticalAlign="center" style={{ height: '80vh' }}>
    <Text variant="xLargePlus">An Error Occurred: {error ? error.errorCode : "unknown error"}</Text>
  </Stack>


}