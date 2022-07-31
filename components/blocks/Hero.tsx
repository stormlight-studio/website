import nl2br from 'react-nl2br';
import Link from '../components/Link';
import Container from '../layout/Container';
import { IHero } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/Hero.module.scss';

const Hero = ({ title, subtitle, description, button }: IHero) => {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          {subtitle && <h3>{subtitle}</h3>}
          <h1>{nl2br(title)}</h1>
          <h2>{description}</h2>
          {button && <Link {...button} className="button" />}
        </div>
      </Container>
    </div>
  );
};

export default Hero;
