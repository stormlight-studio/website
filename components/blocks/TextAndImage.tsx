import { ITextAndImage } from '../../@types/generated/contentful';
import Image from '../components/Image';
import RichText from '../components/RichText';
import Container from '../layout/Container';
import styles from '../../styles/components/blocks/TextAndImage.module.scss';

const TextAndImage = ({ text, subtitle, image }: ITextAndImage) => {
  return (
    <div className={styles.textAndImage}>
      <Container>
        {subtitle && <h3>{subtitle}</h3>}
        <RichText wrap className={styles.text} center>
          {text}
        </RichText>
        <div className={styles.image}>
          <Image {...image} />
        </div>
      </Container>
    </div>
  );
};

export default TextAndImage;
