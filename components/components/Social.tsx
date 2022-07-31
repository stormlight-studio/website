import { useGlobal } from '../../context/Global';
import Link from './Link';
import styles from '../../styles/components/components/Social.module.scss';
import Icon from '../assets/Icon';

const Social = () => {
  const { linkedInLink } = useGlobal();

  return linkedInLink ? (
    <div className={styles.social}>
      <ul>
        <li>
          <Link href={linkedInLink}>
            <Icon name="linkedIn" />
          </Link>
        </li>
      </ul>
    </div>
  ) : null;
};

export default Social;
