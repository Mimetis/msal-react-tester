import { Box, Typography } from '@mui/material';
import * as React from 'react';

interface IUnauthenticatedComponentProps { }

const UnauthenticatedComponent: React.FunctionComponent<IUnauthenticatedComponentProps> = (props) => {
  return (
    <Box>
      <Typography color="inherit" variant="h5" component="h1">
        Please sign-in.
      </Typography>
    </Box>
  );
};

export default UnauthenticatedComponent;
