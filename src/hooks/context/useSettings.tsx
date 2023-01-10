import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// lib
import { readFile } from '../../lib/file-management';

type Settings = {
  defaultEditorLanguage: string;
};

interface SettingsContextT {
  settings: Settings;
  loadSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextT>({} as SettingsContextT);
const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({} as Settings);

  const loadSettings = async () => {
    try {
      const file = await readFile('settings.json');
      const settings: Settings = JSON.parse(file);

      if (settings) {
        setSettings(settings);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load settings');
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return <SettingsContext.Provider value={{ settings, loadSettings }}>{children}</SettingsContext.Provider>;
};

export default useSettings;
