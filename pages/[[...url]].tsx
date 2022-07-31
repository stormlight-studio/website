import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import striptags from 'striptags';
import { v4 as uuidv4 } from 'uuid';
import { fetchEntries } from '../cms/api';
import { GlobalConfig, useGlobal } from '../context/Global';
import Header from '../components/layout/Header';
import Main from '../components/layout/Main';
import Blocks from '../components/layout/Blocks';
import Footer from '../components/layout/Footer';
import {
  getStaticPropsForPage,
  getUrlFromParams,
  pageMap,
} from '../utils/next/static';
import { notWebp } from '../utils/assets/images';
import { IPage } from '../@types/generated/contentful';

interface NextPageProps extends IPage {
  contentType: string;
  global: GlobalConfig;
}

const Page: NextPage<NextPageProps> = ({
  contentType,
  global,
  blocks,
  socialShareImage,
  ...props
}) => {
  const { siteName, pageUrlFull } = useGlobal();

  // add site name to title
  const titleParts = [striptags(props.title)];
  if (siteName) {
    titleParts.push(siteName);
  }

  // convert special pages to blocks[]
  const pageContent = pageMap[contentType];
  if (pageContent) {
    blocks = [
      {
        cmsReference: uuidv4(),
        contentType: pageContent.block,
        ...props,
      },
      ...(blocks ? blocks : []),
    ];
  }

  // get the image for open graph
  const ogImage = socialShareImage || global.socialShareImage;

  return (
    <>
      <NextSeo
        title={titleParts.join(' | ')}
        description={props.description}
        canonical={pageUrlFull}
        openGraph={{
          url: pageUrlFull,
          type: 'website',
          images: [
            {
              url: `https:${notWebp(ogImage.src)}`,
              alt: ogImage.alt,
              width: ogImage.width,
              height: ogImage.height,
            },
          ],
        }}
      />
      <Header />
      <Main key={props.url}>
        <Blocks blocks={blocks} />
        <Footer />
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageUrl = getUrlFromParams(params);
  return getStaticPropsForPage<NextPageProps>(pageUrl);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await Promise.all(
    ['page', ...Object.keys(pageMap)].map((pageType) =>
      fetchEntries<IPage>({
        content_type: pageType,
      })
    )
  );

  const pages = allPages
    .flatMap((page) => page)
    .filter(({ fields: { url } }) => url !== '404');

  const paths = pages.map(({ fields: { url } }) => ({
    params: { url: url === 'home' ? [''] : url.split('/') },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
