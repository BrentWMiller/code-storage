import { FileEntry } from '@tauri-apps/api/fs';
import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

// lib
import { appConfig } from '../../lib/config';
import { loadDirContents } from '../../lib/file-management';

interface SnippetT extends FileEntry {
  tags?: string[];
}

interface SnippetsContextT {
  snippets: SnippetT[];
  loadSnippets: () => Promise<void>;
}

const SnippetsContext = createContext<SnippetsContextT>({} as SnippetsContextT);
const useSnippets = () => useContext(SnippetsContext);

export const SnippetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [snippets, setSnippets] = useState<SnippetT[]>([]);

  const loadSnippets = async () => {
    try {
      const contents: SnippetT[] = await loadDirContents(appConfig.DEFAULT_SNIPPETS_FOLDER);

      // filter out ignored files
      const filteredContents = contents.filter((file: SnippetT) => !appConfig.DEFAULT_FILE_IGNORE_LIST.includes(file.name));

      // Grab tags from title and add to snippet object
      // reset title to just the title
      filteredContents.forEach((snippet) => {
        const title = snippet.name;
        const tags = title.split('|')[1]?.trim();
        snippet.name = title.split('|')[0].trim();
        snippet.tags = tags ? tags.split(',').map((tag) => tag.trim()) : [];
      });

      setSnippets(filteredContents);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load snippets');
    }
  };

  return <SnippetsContext.Provider value={{ snippets, loadSnippets }}>{children}</SnippetsContext.Provider>;
};

export default useSnippets;
