import type { ReactNode } from 'react';
import classNames from 'classnames';
import styles from '../../styles/components/layout/Container.module.scss';

interface ContainerProps {
  className?: string;
  wide?: boolean;
  large?: boolean;
  medium?: boolean;
  narrow?: boolean;
  children: ReactNode;
}

const Container = ({
  className = '',
  wide,
  large,
  medium,
  narrow,
  children,
}: ContainerProps) => {
  return (
    <div
      className={classNames('container', {
        [styles.wide]: wide,
        [styles.large]: large,
        [styles.medium]: medium,
        [styles.narrow]: narrow,
        [className]: className,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
