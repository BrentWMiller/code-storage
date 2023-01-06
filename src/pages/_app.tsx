import type { AppProps } from 'next/app';

// styles
import '../style.css';

// components
import Sidebar from '../components/global/Sidebar';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='flex min-h-screen'>
        <main className='flex flex-grow bg-nightowl-bg text-white'>
          <Sidebar />

          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
