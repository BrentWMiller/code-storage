import { FileEntry } from '@tauri-apps/api/fs';
import { createContext, useContext, useId, useState } from 'react';
import toast from 'react-hot-toast';

// lib
import { appConfig } from '../../lib/config';
import { loadDirContents } from '../../lib/file-management';

export interface SnippetT {
  id: string;
  title: string;
  path: string;
  name: string;
  tags?: string[];
}

interface SnippetsContextT {
  snippets: SnippetT[];
  loadSnippets: () => Promise<void>;
  loadSnippet: (id: string) => Promise<SnippetT | null>;
}

const SnippetsContext = createContext<SnippetsContextT>({} as SnippetsContextT);
const useSnippets = () => useContext(SnippetsContext);

export const SnippetsProvider = ({ children }: { children: React.ReactNode }) => {
  const id = useId();
  const [snippets, setSnippets] = useState<SnippetT[]>([]);

  const loadSnippets = async () => {
    try {
      const basePath = `${appConfig.DEFAULT_BASE_FOLDER}/${appConfig.DEFAULT_SNIPPETS_FOLDER}`;
      const files: string[] = await loadDirContents(basePath);

      // filter out ignored files
      const filteredFiles = files.filter((path: string) => !appConfig.DEFAULT_FILE_IGNORE_LIST.includes(path));
      const snippets = filteredFiles.map((fileName: string) => {
        const name = fileName.split('|')[0].trim();
        const id = name.replace(/\s/g, '-').toLowerCase();
        const tagsString = fileName.split('|')[1]?.trim();
        const tags = tagsString ? tagsString.split(',').map((tag) => tag.trim()) : []

        return {
          id,
          title: fileName,
          path: `${basePath}/${fileName}`,
          name,
          tags
        };
      });

      setSnippets(snippets);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load snippets');
    }
  };

  const loadSnippet = async (id: string): Promise<SnippetT | null> => {
    try {
      const snippet: SnippetT = snippets.find((snippet) => snippet.id === id);

      if (!snippet) {
        throw new Error(`Snippet with id ${id} not found`);
      }

      // // Load snippet contents
      // const content = await loadDirContents(snippet.path);
      // console.log(content);

      return snippet;
    } catch (error) {
      console.error(error);
      toast.error('Failed to load snippet');
      return null;
    }
  };

  return <SnippetsContext.Provider value={{ snippets, loadSnippets, loadSnippet }}>{children}</SnippetsContext.Provider>;
};

export default useSnippets;
