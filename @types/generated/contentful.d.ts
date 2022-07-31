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

  /** Image */
  image: Asset;

  /** Show Image On Article Page */
  showImageOnArticlePage?: boolean | undefined;

  /** Image Quote */
  imageQuote?: string | undefined;

  /** Image Quote Colour */
  imageQuoteColour?: 'Blue' | 'Purple' | 'Orange' | undefined;

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
  blocks?: (IContactForm | IContent | ICtaBanner)[] | undefined;
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
  blocks?: (IContactForm | IContent | ICtaBanner)[] | undefined;
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

  /** Form Title */
  formTitle: string;

  /** Form Description */
  formDescription: string;

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

  /** Subtitle */
  subtitle?: string | undefined;

  /** Description */
  description: string;

  /** Button */
  button: ILink;

  /** Text Link */
  textLink?: ILink | undefined;

  /** Style */
  style: 'Primary' | 'Focus';
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

export interface ILatestCaseStudies {
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
      )[]
    | undefined;
}
