import { IconButton, Stack, useTheme } from '@fluentui/react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { getStyles } from './Header.styles';
import { SignInSignOutButton } from './SignInSignOutButton';

const Header: React.FunctionComponent = (): React.ReactElement => {
  const theme = useTheme();
  const styles = getStyles({ theme: theme });
  const navigate = useNavigate();

  const navToHome = () => {
    navigate(`/`, { replace: true });
  };
  return (
    <>
      <Stack tokens={{ childrenGap: 5 }} styles={styles.stackStyles}>
        <Stack horizontal horizontalAlign="space-between">
          <Stack horizontal verticalAlign="center">
            <IconButton iconProps={{iconName:"CollapseMenu"}}  onClick={navToHome} styles={{root:{background:theme.palette.neutralLight}}}  />
          </Stack>

          <Stack horizontal verticalAlign="center">
            <SignInSignOutButton loginType='Redirect' />
            <SignInSignOutButton loginType='Popup' />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
