import type { AppProps } from 'next/app';

// styles
import '../style.css';

// components
import Sidebar from '../components/global/Sidebar';
import { Toaster } from 'react-hot-toast';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='flex min-h-screen'>
        <main className='flex flex-grow bg-nightowl-bg text-white'>
          <Sidebar />

          <Component {...pageProps} />

          <Toaster position='bottom-right' toastOptions={{ style: { background: '#1f2937', color: '#fff' } }} />
        </main>
      </div>
    </>
  );
}
