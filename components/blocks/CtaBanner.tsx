import nl2br from 'react-nl2br';
import Container from '../layout/Container';
import Link from '../components/Link';
import { ICtaBanner } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/CtaBanner.module.scss';
import Image from '../components/Image';

const CtaBanner = ({
  hashId,
  title,
  description,
  button,
  image,
}: ICtaBanner) => {
  return (
    <div id={hashId} className={styles.ctaBanner}>
      {image && <Image {...image} className={styles.bg} />}
      <div className={styles.inner}>
        <Container medium>
          <h4>{nl2br(title)}</h4>
          {description && <h5>{description}</h5>}
          <div className={styles.button}>
            <Link {...button} className="button" />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CtaBanner;
