import { GetStaticProps } from 'next';
import { getStaticPropsForPage } from '../utils/next/static';
export { default as default } from './[[...url]]';

export const getStaticProps: GetStaticProps = async () => {
  return getStaticPropsForPage('404');
};
