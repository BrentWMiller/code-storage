import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

// themes
import { theme as darkulaTheme } from '../editor-themes/darkula';

// hooks
import useSettings from '../hooks/context/useSettings';
import { SnippetT } from '../hooks/context/useSnippets';

declare global {
  interface Window {
    monaco: any;
  }
}

type Props = {
  theme?: ThemeOptions;
  snippet?: SnippetT;
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

const CodeEditor = ({ theme, snippet, onCodeChange, onFileNameChange }: Props) => {
  const { settings } = useSettings();
  const editorRef = useRef(null);
  const fileNameRef = useRef<HTMLInputElement>(null);
  const [languages, setLanguages] = useState<MonacoLanguage[]>([]);

  function handleEditorWillMount(monaco) {
    const languages = monaco.languages.getLanguages();
    setLanguages(languages);

    monaco.editor.defineTheme(ThemeOptions.DARKULA, themeConfigs[ThemeOptions.DARKULA]);
  }

  function handleEditorOnMount(editor) {
    editorRef.current = editor;

    if (snippet?.files?.[0]?.value) {
      editor.setValue(snippet.files?.[0].value);
    }

    if (snippet?.files?.[0]?.name) {
      fileNameRef.current.value = snippet.files?.[0].name;
      updateLanguage(snippet.files?.[0].name);
    }
  }

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileName = e.currentTarget.value;
    updateLanguage(fileName);
    onFileNameChange(fileName);
  };

  const updateLanguage = (fileName: string) => {
    if (!fileName || !fileName.includes('.')) return;

    const extension = fileName.split('.').pop();

    if (!editorRef.current || !extension) return;
    const language = languages.find((language) => language?.extensions?.includes(`.${extension}`));

    if (language) {
      // TODO: Editor language is not updating when switching between files
      editorRef.current.updateOptions({ language: language.id });
      window.monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], language.id);
    }
  };

  useEffect(() => {
    if (snippet) {
      fileNameRef.current.value = snippet.name;
    }
  }, [snippet]);

  return (
    <section className='flex h-full flex-col'>
      <header className='flex items-center justify-between gap-3 bg-theme-sidebar/50 px-8 py-4'>
        <input
          ref={fileNameRef}
          name='file-name'
          type='text'
          className='appearance-none bg-transparent text-lg font-semibold'
          placeholder='Name your file...'
          onChange={(e) => handleFileNameChange(e)}
        />
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
          defaultValue='// Write some code...'
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
