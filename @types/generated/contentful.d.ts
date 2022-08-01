export interface IBlogArticle {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Title */
  title: string;

  /** URL */
  url: string;

  /** Summary */
  summary: string;

  /** Image */
  image: Asset;

  /** Show Image On Article Page */
  showImageOnArticlePage?: boolean | undefined;

  /** Author */
  author: string;

  /** Date */
  date: string;

  /** Content */
  content: string;

  /** Categories */
  categories: string[];

  /** Associated Blog Articles */
  associatedBlogArticles: IBlogArticle[];

  /** Blocks */
  blocks?:
    | (
        | IContactForm
        | IContent
        | ICtaBanner
        | ILatestCaseStudies
        | ITextAndImage
      )[]
    | undefined;
}

export interface IBlogCategory {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Title */
  title: string;
}

export interface ICaseStudy {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Name */
  name: string;

  /** URL */
  url: string;

  /** Title */
  title: string;

  /** Logo */
  logo: Asset;

  /** Summary */
  summary: string;

  /** Intro */
  intro: string;

  /** Content */
  content: string;

  /** Sort Order */
  sortOrder: number;

  /** Associated Case Studies */
  associatedCaseStudies: ICaseStudy[];

  /** Blocks */
  blocks?:
    | (
        | IContactForm
        | IContent
        | ICtaBanner
        | ILatestCaseStudies
        | ITextAndImage
      )[]
    | undefined;
}

export interface IColour {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Colour */
  colour: string;
}

export interface IContactForm {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Title */
  title: string;

  /** Description */
  description: string;

  /** Success Text */
  successText: string;

  /** Failure Text */
  failureText: string;

  /** Submit Text */
  submitText: string;
}

export interface IContent {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Reference */
  reference: string;

  /** Content */
  content: string;

  /** Container Width */
  containerWidth: 'Full' | 'Wide' | 'Medium' | 'Narrow';

  /** Center Text */
  centerText?: boolean | undefined;

  /** Bold Text */
  boldText?: boolean | undefined;
}

export interface ICtaBanner {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Title */
  title: string;

  /** Description */
  description?: string | undefined;

  /** Button */
  button: ILink;

  /** Image */
  image?: Asset | undefined;
}

export interface IGlobalConfig {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Site Name */
  siteName: string;

  /** Logo */
  logo: Asset;

  /** Phone Number */
  phoneNumber: string;

  /** Email */
  email: string;

  /** Social Share Image */
  socialShareImage: Asset;

  /** Menu Items */
  menuItems: ILink[];

  /** Footer Email Form */
  footerEmailForm: IContactForm;

  /** Footer Menu Items */
  footerMenuItems: ILink[];

  /** LinkedIn Link */
  linkedInLink?: string | undefined;

  /** Google ReCAPTCHA Site Key */
  googleReCaptchaSiteKey: string;

  /** Google Maps Link */
  googleMapsLink?: string | undefined;

  /** Facebook App ID */
  facebookAppId?: string | undefined;

  /** GTM ID */
  gtmId?: string | undefined;
}

export interface IHero {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Title */
  title: string;

  /** Subtitle */
  subtitle?: string | undefined;

  /** Description */
  description: string;

  /** Button */
  button?: ILink | undefined;

  /** Background Image */
  backgroundImage?: Asset | undefined;
}

export interface IHeroBlog {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Title */
  title: string;

  /** Blog Articles */
  blogArticles: IBlogArticle[];
}

export interface IHeroCaseStudies {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Title */
  title: string;

  /** Case Studies */
  caseStudies?: ICaseStudy[] | undefined;
}

export interface IImageBanner {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Image */
  image: Asset;
}

export interface ILatestBlogArticles {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Blog Articles */
  blogArticles: IBlogArticle[];

  /** Link */
  link: ILink;
}

export interface ILatestCaseStudies {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Case Studies */
  caseStudies?: ICaseStudy[] | undefined;

  /** Link */
  link: ILink;
}

export interface ILink {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Text */
  text: string;

  /** Link */
  href: string;
}

export interface IPage {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** URL */
  url: string;

  /** Title */
  title: string;

  /** Description */
  description: string;

  /** Social Share Image */
  socialShareImage?: Asset | undefined;

  /** Blocks */
  blocks?:
    | (
        | IContactForm
        | IContent
        | ICtaBanner
        | IHero
        | IHeroBlog
        | IHeroCaseStudies
        | IImageBanner
        | ILatestBlogArticles
        | ILatestCaseStudies
        | IQuotes
        | IStats
        | ITextAndImage
        | IThreeColumns
      )[]
    | undefined;
}

export interface IQuote {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Name */
  name: string;

  /** Quote */
  quote: string;

  /** Company */
  company: string;
}

export interface IQuotes {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Quotes */
  quotes: IQuote[];
}

export interface IStat {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Title */
  title: string;

  /** Number */
  number: number;

  /** Prefix */
  prefix?: string | undefined;

  /** Suffix */
  suffix?: string | undefined;
}

export interface IStats {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Stats */
  stats: IStat[];
}

export interface ITextAndImage {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Text */
  text: string;

  /** Subtitle */
  subtitle?: string | undefined;

  /** Image */
  image: Asset;
}

export interface IThreeColumnItem {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** Title */
  title: string;

  /** Description */
  description: string;

  /** Icon */
  icon?: Asset | undefined;

  /** Link */
  link?: ILink | undefined;
}

export interface IThreeColumns {
  /** contentType */
  contentType: string;

  /** cmsId */
  cmsId: string;

  /** hashId */
  hashId: string;

  /** CMS Reference */
  cmsReference: string;

  /** Columns */
  columns: IThreeColumnItem[];
}
