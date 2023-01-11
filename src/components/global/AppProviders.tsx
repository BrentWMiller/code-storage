import React from 'react';

// hooks
import { SettingsProvider } from '../../hooks/context/useSettings';
import { SnippetsProvider } from '../../hooks/context/useSnippets';
import { ThemeProvider } from '../../hooks/context/useTheme';

type Props = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <SnippetsProvider>{children}</SnippetsProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
};

export default AppProviders;
