import { useGlobal } from '../../context/Global';
import Container from '../layout/Container';
import Menu from '../layout/Menu';
import Icon from '../assets/Icon';
import styles from '../../styles/components/layout/Footer.module.scss';

const Footer = () => {
  const { footerMenuItems } = useGlobal();

  return (
    <footer className={styles.footer}>
      <Container>
        <Icon name="logo" />
        <Menu menuItems={footerMenuItems} />
      </Container>
    </footer>
  );
};

export default Footer;
