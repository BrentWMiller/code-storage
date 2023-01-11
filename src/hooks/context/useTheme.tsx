import { FileEntry } from '@tauri-apps/api/fs';
import { createContext, useContext, useState } from 'react';

interface ThemeContextT {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextT>({} as ThemeContextT);
const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <ThemeContext.Provider value={{ sidebarOpen, setSidebarOpen }}>{children}</ThemeContext.Provider>;
};

export default useTheme;
