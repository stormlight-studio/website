import { GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { cleanPageData, fetchEntries, fetchEntry } from '../../cms/api';
import { GlobalConfig } from '../../context/Global';
import { IGlobalConfig } from './../../@types/generated/contentful.d';

interface PageMapItem {
  block: string;
  data?: (pageProps: any) => Promise<any>;
}
interface PageMap {
  [key: string]: PageMapItem;
}

export const pageMap: PageMap = {
  blogArticle: {
    block: 'blogArticle',
    data: async (pageProps) => {
      if (!pageProps.fields.associatedBlogArticles) {
        return {
          associatedBlogArticles: cleanPageData(
            await fetchEntries({
              content_type: 'blogArticle',
              'fields.url[ne]': pageProps.fields.url,
              order: '-fields.date',
              limit: 3,
            })
          ),
        };
      }
      return {};
    },
  },
  caseStudy: {
    block: 'caseStudy',
    data: async (pageProps) => {
      if (!pageProps.fields.associatedCaseStudies) {
        return {
          associatedCaseStudies: cleanPageData(
            await fetchEntries({
              content_type: 'caseStudy',
              'fields.url[ne]': pageProps.fields.url,
              order: 'fields.sortOrder',
              limit: 3,
            })
          ),
        };
      }
      return {};
    },
  },
};

export const getUrlFromParams = (
  params: ParsedUrlQuery | undefined,
  fallbackUrl = ''
): string => {
  if (params && Array.isArray(params.url)) {
    return params.url.join('/');
  }
  return fallbackUrl;
};

export const getStaticPropsForPage = async <P>(
  pageUrl: string
): Promise<GetStaticPropsResult<P>> => {
  // loop custom page types and attempt data fetch
  let pageProps;
  for (const pageType of ['page', ...Object.keys(pageMap)]) {
    pageProps = await fetchEntry({
      content_type: pageType,
      'fields.url': pageUrl || 'home',
    });
    if (pageProps) {
      if (pageType in pageMap) {
        const specialPage = pageMap[pageType];
        if (specialPage.data) {
          const pageTypeData = await specialPage.data(pageProps);
          pageProps = { ...pageProps, ...pageTypeData };
        }
      }
      break;
    }
  }

  // handle 404s
  if (pageUrl !== '404' && !pageProps) {
    return {
      notFound: true,
    };
  }

  // fetch global data
  const globalConfig = await fetchEntry<IGlobalConfig>({
    content_type: 'globalConfig',
  });
  const global: GlobalConfig = {
    ...globalConfig.fields,
    pageUrl,
    pageUrlFull: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${pageUrl}`,
  };

  // clean the props
  const props = cleanPageData({ ...pageProps, global });

  // loop blocks and get extra data if needed
  if (props.blocks) {
    for (const block of props.blocks) {
      // get case studies
      if (
        block.contentType === 'latestCaseStudies' &&
        !block.caseStudies?.length
      ) {
        block.caseStudies = cleanPageData(
          await fetchEntries({
            content_type: 'caseStudy',
            order: 'fields.sortOrder',
            limit: 3,
          })
        );
      }

      // get blog articles
      if (block.contentType === 'heroBlog' && !block.blogArticles?.length) {
        block.blogArticles = cleanPageData(
          await fetchEntries({
            content_type: 'blogArticle',
            order: '-fields.date',
          })
        );
      }

      // get case studies
      if (
        block.contentType === 'heroCaseStudies' &&
        !block.caseStudies?.length
      ) {
        block.caseStudies = cleanPageData(
          await fetchEntries({
            content_type: 'caseStudy',
            order: 'fields.sortOrder',
          })
        );
      }
    }
  }

  return {
    props,
    revalidate: 60,
  };
};
