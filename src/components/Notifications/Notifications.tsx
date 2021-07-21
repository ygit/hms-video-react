import React, { useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  useSnackbar,
  SnackbarProvider,
  SnackbarProps,
  ClassNameMap,
  OptionsObject,
} from 'notistack';
import { useHMSTheme } from '../../hooks/HMSThemeProvider';
import { hmsUiClassParserGenerator } from '../../utils/classes';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 612,
    },
  }),
);

const defaultClasses: Partial<ClassNameMap> = {
  anchorOriginBottomLeft: 'bottom-16',
  containerRoot: `rounded-lg dark:bg-gray-100 bg-white flex items-center justify-between`,
};

export const useHMSToast = (defaultOptions: OptionsObject) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return {
    showToast: (message: string, options: OptionsObject) =>
      enqueueSnackbar(message, { ...defaultOptions, ...options }),
    hideToast: closeSnackbar,
  };
};

export const HMSToastContainer: React.FC<Partial<SnackbarProps>> = props => {
  const styles = useStyles();
  const { tw } = useHMSTheme();
  const styler = useMemo(
    () =>
      hmsUiClassParserGenerator<Partial<ClassNameMap>>({
        tw,
        defaultClasses,
        tag: 'hmsui-toast',
      }),
    [],
  );
  return (
    <SnackbarProvider
      maxSnack={3}
      classes={{
        containerRoot: `${styler('containerRoot')} ${styles.root}`,
        anchorOriginBottomLeft: styler('anchorOriginBottomLeft'),
      }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      {props.children}
    </SnackbarProvider>
  );
};
