import type { AppProps } from 'next/app';

// styles
import '../styles/globals.css';

// components
import Sidebar from '../components/global/Sidebar';
import { Toaster } from 'react-hot-toast';
import { SettingsProvider } from '../hooks/context/useSettings';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <div className='flex min-h-screen bg-theme-bg'>
        <main className='flex flex-grow text-white'>
          <Sidebar />

          <Component {...pageProps} />

          <Toaster position='bottom-right' toastOptions={{ style: { background: '#1f2937', color: '#fff' } }} />
        </main>
      </div>
    </SettingsProvider>
  );
}
