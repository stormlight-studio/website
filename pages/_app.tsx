import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import GlobalContext from '../context/Global';
import Gtm from '../components/head/Gtm';

import lazySizes from 'lazysizes';
lazySizes.cfg.preloadAfterLoad = true;
lazySizes.cfg.loadMode = 3; // eagerly load images
lazySizes.cfg.expFactor = 4;

import 'nprogress/nprogress.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/styles.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  return (
    <>
      <GlobalContext.Provider value={pageProps.global}>
        {/* <Gtm /> */}
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
}
