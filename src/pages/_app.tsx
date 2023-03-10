import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

// styles
import '../styles/globals.css';

// components
import AppProviders from '../components/global/AppProviders';
import Sidebar from '../components/global/Sidebar';
import TitleBar from '../components/global/TitleBar';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <TitleBar />
      <div className='flex max-h-screen min-h-screen overflow-hidden bg-theme-bg'>
        <main className='flex flex-grow text-white'>
          <Sidebar />

          <Component {...pageProps} />

          <Toaster position='bottom-right' toastOptions={{ style: { background: '#1f2937', color: '#fff' } }} />
        </main>
      </div>
    </AppProviders>
  );
}
