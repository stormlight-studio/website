import nl2br from 'react-nl2br';
import Container from '../layout/Container';
import Link from '../components/Link';
import { ICtaBanner } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/CtaBanner.module.scss';

const CtaBanner = ({
  hashId,
  title,
  subtitle,
  description,
  button,
  textLink,
}: ICtaBanner) => {
  return (
    <div id={hashId} className={styles.ctaBanner}>
      <div className={styles.inner}>
        <Container medium>
          {subtitle && <h3>{subtitle}</h3>}
          <h4>{nl2br(title)}</h4>
        </Container>
        <Container narrow>
          <h5>{description}</h5>
          <Link {...button} className="button" />
          {textLink && (
            <div className={styles.link}>
              <Link {...textLink} className="textLink" />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default CtaBanner;
