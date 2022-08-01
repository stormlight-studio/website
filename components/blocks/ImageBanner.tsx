import Image from '../components/Image';
import styles from '../../styles/components/blocks/ImageBanner.module.scss';
import { IImageBanner } from '../../@types/generated/contentful';

const ImageBanner = ({ image }: IImageBanner) => {
  return (
    <div className={styles.imageBanner}>
      <Image {...image} />
    </div>
  );
};

export default ImageBanner;
