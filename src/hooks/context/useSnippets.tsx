import { FileEntry } from '@tauri-apps/api/fs';
import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

// lib
import { appConfig } from '../../lib/config';
import { loadDirContents } from '../../lib/file-management';

interface SnippetsContextT {
  snippets: FileEntry[];
  loadSnippets: () => Promise<void>;
}

const SnippetsContext = createContext<SnippetsContextT>({} as SnippetsContextT);
const useSnippets = () => useContext(SnippetsContext);

export const SnippetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [snippets, setSnippets] = useState<FileEntry[]>([]);

  const loadSnippets = async () => {
    try {
      const contents = await loadDirContents(appConfig.DEFAULT_SNIPPETS_FOLDER);
      setSnippets(contents);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load snippets');
    }
  };

  return <SnippetsContext.Provider value={{ snippets, loadSnippets }}>{children}</SnippetsContext.Provider>;
};

export default useSnippets;
