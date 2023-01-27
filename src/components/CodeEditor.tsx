import { ChangeEvent, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

// themes
import { theme as darkulaTheme } from '../editor-themes/darkula';

// lib
import { appConfig } from '../lib/config';

// hooks
import useSettings from '../hooks/context/useSettings';

declare global {
  interface Window {
    monaco: any;
  }
}

type Props = {
  theme?: ThemeOptions;
  onCodeChange?: (value: string) => void;
  onFileNameChange?: (fileName: string) => void;
};

type MonacoLanguage = {
  id: string;
  extensions: string[];
  aliases: string[];
  mimetypes: string[];
};

export enum ThemeOptions {
  DARKULA = 'darkula',
}

const themeConfigs = {
  [ThemeOptions.DARKULA]: darkulaTheme,
};

const CodeEditor = ({ theme, onCodeChange, onFileNameChange }: Props) => {
  const { settings } = useSettings();
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState<string>('');
  const [languages, setLanguages] = useState<MonacoLanguage[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<MonacoLanguage | null>(null);

  function handleEditorWillMount(monaco) {
    const languages = monaco.languages.getLanguages();
    setLanguages(languages);

    monaco.editor.defineTheme(ThemeOptions.DARKULA, themeConfigs[ThemeOptions.DARKULA]);
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

    onFileNameChange(fileName);
  };=

  return (
    <section className='flex h-full flex-col'>
      <header className='flex items-center justify-between bg-theme-sidebar px-8 py-2'>
        <div className='flex items-center gap-3'>
          <input
            name='file-name'
            type='text'
            className='appearance-none bg-transparent'
            placeholder='Name your file...'
            value={fileName ? fileName : settings.defaultFileName}
            onChange={(e) => handleFileNameChange(e)}
          />
        </div>
      </header>

      <div className='relative h-full flex-shrink-0 p-4'>
        <Editor
          width='100%'
          height='90%'
          defaultLanguage={settings.defaultEditorLanguage}
          theme={theme ? theme : ThemeOptions.DARKULA}
          onMount={handleEditorOnMount}
          beforeMount={handleEditorWillMount}
          onChange={(value) => onCodeChange(value)}
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
