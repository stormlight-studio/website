import { createElement } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { CmsImage } from '../../cms/models';
import styles from '../../styles/components/components/Image.module.scss';

interface ImageProps extends CmsImage {
  className?: string;
  block?: boolean;
  lazyload?: boolean;
  forceWidth?: number;
  forceHeight?: number;
  sizes?: {
    [width: number]: [number, number];
  };
}

const Image = ({
  src = '',
  className = '',
  block = false,
  lazyload = true,
  width,
  height,
  forceWidth,
  forceHeight,
  sizes,
  ...props
}: Partial<ImageProps>) => {
  const imageProps = {
    className: classNames({
      lazyload,
      [styles.block]: block,
      [className]: className,
    }),
    ...props,
  };

  let srcKey = lazyload ? 'data-src' : 'src';

  if (src.indexOf('?') === -1) {
    src += '?';
  }

  if (forceWidth) {
    src += `&w=${forceWidth}`;
  }
  if (forceHeight) {
    src += `&h=${forceHeight}`;
  }
  if (forceWidth || forceHeight) {
    src += '&fit=fill';
  }

  if (sizes) {
    srcKey = lazyload ? 'data-srcset' : 'srcset';
    src = Object.entries(sizes)
      .map(
        ([viewportWidth, [width, height]]) =>
          `${src}?w=${width}&h=${height}&fit=fill ${viewportWidth}w`
      )
      .join(', ');
  }

  return (
    <>
      {!sizes && !lazyload && (
        <Head>
          <link rel="preload" as="image" href={src} />
        </Head>
      )}
      {createElement('img', { ...imageProps, [srcKey]: src })}
    </>
  );
};

export default Image;
