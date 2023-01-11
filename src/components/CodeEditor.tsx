import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { toast } from 'react-hot-toast';

// themes
import { theme as nightOwlTheme } from '../editor-themes/night-owl';
import { theme as darkulaTheme } from '../editor-themes/darkula';
import { theme as monokaiTheme } from '../editor-themes/monokai';

// lib
import { appConfig } from '../lib/config';
import { checkForAndCreateDir, saveFile } from '../lib/file-management';

// hooks
import useSettings from '../hooks/context/useSettings';

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

const CodeEditor = ({ theme }: Props) => {
  const { settings } = useSettings();
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState<string>('');
  const [languages, setLanguages] = useState<MonacoLanguage[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<MonacoLanguage | null>(null);
  const [currentLanguageIcon, setCurrentLanguageIcon] = useState<string>(`${appConfig.LANGUAGE_ICONS_FOLDER}/default_file.svg`);

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
      getLanguageIcon(language);
    }
  };

  const handleSave = async () => {
    const fileValue = editorRef.current.getValue();

    try {
      await checkForAndCreateDir('files');
      await saveFile(fileName, fileValue, 'files');
      toast.success('File saved successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save file');
    }
  };

  const getLanguageIcon = async (language: MonacoLanguage) => {
    const defaultIcon = `${appConfig.LANGUAGE_ICONS_FOLDER}/default_file.svg`;

    if (!language) {
      setCurrentLanguageIcon(defaultIcon);
      return;
    }

    const extension = language?.extensions?.[0].replace('.', '');
    let path = `${appConfig.LANGUAGE_ICONS_FOLDER}/${extension || 'default_file'}.svg`;
    let res = await fetch(path);

    if (res.status !== 404) {
      setCurrentLanguageIcon(path);
    } else {
      path = `${appConfig.LANGUAGE_ICONS_FOLDER}/${language?.aliases?.[0] || 'default_file'}.svg`;
      res = await fetch(path);

      if (res.status !== 404) {
        setCurrentLanguageIcon(path);
      } else {
        setCurrentLanguageIcon(defaultIcon);
      }
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
      <header className='flex items-center justify-between bg-theme-sidebar px-8 py-2'>
        <div className='flex items-center gap-3'>
          <img src={currentLanguageIcon} alt={`Logo for ${currentLanguage}`} className='w-4 h-4' />

          <input
            className='bg-transparent appearance-none'
            placeholder='Name your file...'
            value={fileName ? fileName : settings.defaultFileName}
            onChange={(e) => handleFileNameChange(e)}
          />
        </div>

        <button type='button' onClick={() => handleSave()}>
          Save file
        </button>
      </header>

      <div className='relative flex-shrink-0 h-full p-4'>
        <Editor
          width='100%'
          height='90%'
          defaultLanguage={settings.defaultEditorLanguage}
          theme={theme ? theme : ThemeOptions.DARKULA}
          onMount={handleEditorOnMount}
          beforeMount={handleEditorWillMount}
          options={{
            fontFamily: 'FiraCode',
            fontSize: 16,
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </section>
  );
};

export default CodeEditor;
