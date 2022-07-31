import { useGlobal } from '../../context/Global';
import Container from './Container';
import Menu from './Menu';
import Social from '../components/Social';
import Link from '../components/Link';
import styles from '../../styles/components/layout/OverlayMenu.module.scss';
import Icon from '../assets/Icon';

interface OverlayProps {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const OverlayMenu = ({ setIsMenuOpen }: OverlayProps) => {
  const { menuItems } = useGlobal();

  return (
    <>
      <div className={styles.overlayMenu}>
        <Container className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.logo}>
              <Link href="/">
                <Icon name="logo" />
              </Link>
            </div>
            <div className={styles.mainMenu}>
              <Menu menuItems={menuItems} />
            </div>
            <Social />
          </div>
        </Container>
      </div>
      <button
        className={styles.close}
        aria-label="Close menu"
        onClick={() => setIsMenuOpen(false)}
      >
        <Icon name="menuClose" />
      </button>
    </>
  );
};

export default OverlayMenu;
