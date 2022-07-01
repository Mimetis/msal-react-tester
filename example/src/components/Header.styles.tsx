import { DeepPartial } from '@fluentui/merge-styles';
import { IButtonStyles, ILinkStyles, IStackStyles, ITheme } from '@fluentui/react';

export const getStyles = (props) => {
  const theme = props.theme as ITheme;

  const stackStyles: DeepPartial<IStackStyles> = {
    root: [
      {
        background:  theme.palette.themePrimary,
        marginLeft: 0,
        marginRight: 0,
        padding:5,
        height: 'auto',
        width: `100%`,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      },
    ],
  };

  const ajzLinkStyles: DeepPartial<ILinkStyles> = {
    root: {
      background:'red',
      paddingLeft: 6,
      transform: 'scale(0.8)',
    },
  };

  const buttonStyles: DeepPartial<IButtonStyles> = {
    root: {
      alignItems: 'center',
      color: 'white',
      display: 'flex',
      height: 50,
      justifyContent: 'center',
      width: 56,
      paddingLeft: 3,
    },
    rootHovered: {
      background: theme.palette.themeTertiary,
    },
    iconHovered: {
      color: 'white',
    },
  };

  return {
    buttonStyles,
    ajzLinkStyles,
    stackStyles,
  };
};
