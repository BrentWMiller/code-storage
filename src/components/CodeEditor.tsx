import Editor from '@monaco-editor/react';
import { writeTextFile, BaseDirectory, exists, createDir, readDir } from '@tauri-apps/api/fs';
import { theme as nightOwlTheme } from '../editor-themes/night-owl';
import { theme as darkulaTheme } from '../editor-themes/darkula';
import { theme as monokaiTheme } from '../editor-themes/monokai';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    monaco: any;
  }
}

type Props = {
  theme?: ThemeOptions;
};

type MonacoLanguage = {
  id: string;
  extensions: string[];
  aliases: string[];
  mimetypes: string[];
};

export enum ThemeOptions {
  NIGHT_OWL = 'night-owl',
  DARKULA = 'darkula',
  MONOKAI = 'monokai',
}

const themeConfigs = {
  [ThemeOptions.NIGHT_OWL]: nightOwlTheme,
  [ThemeOptions.DARKULA]: darkulaTheme,
  [ThemeOptions.MONOKAI]: monokaiTheme,
};

const defaultLanguageId = 'txt';

const CodeEditor = ({ theme }: Props) => {
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState<string>('');
  const [languages, setLanguages] = useState<MonacoLanguage[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<MonacoLanguage | null>(null);

  function handleEditorWillMount(monaco) {
    const languages = monaco.languages.getLanguages();
    setLanguages(languages);

    monaco.editor.defineTheme(ThemeOptions.DARKULA, themeConfigs[ThemeOptions.DARKULA]);
    monaco.editor.defineTheme(ThemeOptions.NIGHT_OWL, themeConfigs[ThemeOptions.NIGHT_OWL]);
    monaco.editor.defineTheme(ThemeOptions.MONOKAI, themeConfigs[ThemeOptions.MONOKAI]);
  }

  function handleEditorOnMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileName = e.currentTarget.value;
    setFileName(fileName);

    if (!fileName || !fileName.includes('.')) return;

    const extension = fileName.split('.').pop();

    if (!editorRef.current || !extension) return;
    const language = languages.find((language) => language?.extensions?.includes(`.${extension}`));

    if (language) {
      editorRef.current.updateOptions({ language: language.id });
      window.monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], language.id);
      setCurrentLanguage(language);
    }
  };

  const handleSave = async () => {
    const fileValue = editorRef.current.getValue();

    // check if directory exists
    const dirExists = await exists('Code Storage', { dir: BaseDirectory.Home });
    if (!dirExists) {
      await createDir('Code Storage', { dir: BaseDirectory.Home });
    }

    // Create file
    try {
      await writeTextFile(`Code Storage/${fileName}`, fileValue, { dir: BaseDirectory.Home });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const saveHandler = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', saveHandler);
    return () => {
      window.removeEventListener('keydown', saveHandler);
    };
  }, []);

  return (
    <section className='flex flex-col h-full'>
      <header className='flex items-center justify-between bg-nightowl-sidebar px-8 py-2'>
        <input
          className='bg-transparent appearance-none'
          placeholder='Name your file...'
          value={fileName}
          onChange={(e) => handleFileNameChange(e)}
        />

        {currentLanguage && <p>{(currentLanguage.aliases && currentLanguage.aliases[0]) || currentLanguage.id}</p>}

        <button type='button' onClick={() => handleSave()}>
          Save file
        </button>
      </header>

      <div className='flex-shrink-0 h-full p-4'>
        <Editor
          width='100%'
          height='90%'
          defaultLanguage={defaultLanguageId}
          theme={theme ? theme : ThemeOptions.NIGHT_OWL}
          onMount={handleEditorOnMount}
          beforeMount={handleEditorWillMount}
        />
      </div>
    </section>
  );
};

export default CodeEditor;
