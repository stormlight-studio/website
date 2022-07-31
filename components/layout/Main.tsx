import type { ReactNode } from 'react';
import styles from '../../styles/components/layout/Main.module.scss';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
