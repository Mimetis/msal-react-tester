import { MsalAuthenticationResult } from "@azure/msal-react";
import { Box, Typography } from "@mui/material";

export const ErrorComponent: React.FC<MsalAuthenticationResult> = ({ error }) => {

  return <Box>
    <Typography color="inherit" variant="h5" component="h1">
      An Error Occurred: {error ? error.errorCode : "unknown error"}
    </Typography>
  </Box>


}