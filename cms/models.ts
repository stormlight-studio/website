export interface CmsFile {
  src: string;
}

export interface CmsImage extends CmsFile {
  alt: string;
  width: number;
  height: number;
}

export interface CmsLink {
  href: string;
  text: string;
}
