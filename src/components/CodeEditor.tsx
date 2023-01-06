import Editor from '@monaco-editor/react';
import { theme as nightOwlTheme } from '../editor-themes/night-owl';
import { theme as darkulaTheme } from '../editor-themes/darkula';
import { theme as monokaiTheme } from '../editor-themes/monokai';

type Props = {
  theme?: ThemeOptions;
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
  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme(ThemeOptions.DARKULA, themeConfigs[ThemeOptions.DARKULA]);
    monaco.editor.defineTheme(ThemeOptions.NIGHT_OWL, themeConfigs[ThemeOptions.NIGHT_OWL]);
    monaco.editor.defineTheme(ThemeOptions.MONOKAI, themeConfigs[ThemeOptions.MONOKAI]);
  }

  return (
    <section className='flex flex-col h-full'>
      <header className='bg-nightowl-sidebar px-8 py-2'>
        <p className='font-medium'>
          tailwind.config<span className='text-white/70'>.js</span>
        </p>
      </header>

      <div className='flex-shrink-0 h-full p-4'>
        <Editor
          width='100%'
          height='90%'
          defaultLanguage='typescript'
          defaultValue='// Place your code snippet here'
          theme={theme ? theme : ThemeOptions.NIGHT_OWL}
          beforeMount={handleEditorWillMount}
        />
      </div>
    </section>
  );
};

export default CodeEditor;
