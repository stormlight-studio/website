import content from '../blocks/Content';
import hero from '../blocks/Hero';
import heroBlog from '../blocks/HeroBlog';
import heroCaseStudies from '../blocks/HeroCaseStudies';
import latestCaseStudies from '../blocks/LatestCaseStudies';
import latestBlogArticles from '../blocks/LatestBlogArticles';
import ctaBanner from '../blocks/CtaBanner';
import imageBanner from '../blocks/ImageBanner';
import blogArticle from '../blocks/BlogArticle';
import caseStudy from '../blocks/CaseStudy';
import contactForm from '../blocks/ContactForm';
import textAndImage from '../blocks/TextAndImage';
import threeColumns from '../blocks/ThreeColumns';
import stats from '../blocks/Stats';
import quotes from '../blocks/Quotes';
import { IPage } from '../../@types/generated/contentful';

interface BlockComponents {
  [key: string]: (props: any) => JSX.Element;
}

const blockComponents: BlockComponents = {
  content,
  hero,
  heroBlog,
  heroCaseStudies,
  latestCaseStudies,
  latestBlogArticles,
  ctaBanner,
  imageBanner,
  blogArticle,
  caseStudy,
  contactForm,
  textAndImage,
  threeColumns,
  stats,
  quotes,
};

export default function Blocks({ blocks }: { blocks: IPage['blocks'] }) {
  return (
    <>
      {blocks?.map(({ contentType, ...props }, index) => {
        const Block = blockComponents[contentType];
        return Block ? <Block key={contentType + index} {...props} /> : null;
      })}
    </>
  );
}
