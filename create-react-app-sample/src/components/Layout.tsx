import { Box } from '@mui/material';
import Header from './Header';

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
