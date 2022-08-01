import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useScrollDirection } from 'react-use-scroll-direction';
import { useGlobal } from '../../context/Global';
import Menu from './Menu';
import OverlayMenu from './OverlayMenu';
import Link from '../components/Link';
import styles from '../../styles/components/layout/Header.module.scss';
import Icon from '../assets/Icon';

type Scrolling = 'down' | 'up';

const Header = () => {
  const { menuItems, siteName } = useGlobal();

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [scrolledTop, setScrolledTop] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<Scrolling>('up');
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    isMenuOpen
      ? document.documentElement.classList.add('menuOpen')
      : document.documentElement.classList.remove('menuOpen');
  }, [isMenuOpen]);

  useEffect(() => {
    isScrollingDown && setScrollDirection('down');
    isScrollingUp && setScrollDirection('up');
  }, [isScrollingDown, isScrollingUp]);

  useEffect(() => {
    const handleScroll = () => setScrolledTop(window.scrollY < 10);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={classNames(styles.header, {
          [scrollDirection]: true,
          scrolledTop,
        })}
      >
        <div className={styles.inner}>
          <div>
            <Link href="/" className={styles.logo}>
              <Icon name="logo" />
            </Link>
          </div>
          <div>
            <button
              aria-label="Open menu"
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen(true)}
            >
              <Icon name="menuBurger" />
            </button>
            <Menu menuItems={menuItems} />
          </div>
        </div>
      </header>
      <OverlayMenu setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;
