import Script from 'next/script';
import Icon from '../assets/Icon';
import { useGlobal } from '../../context/Global';
import styles from '../../styles/components/components/Share.module.scss';

declare global {
  interface Window {
    FB: facebook.FacebookStatic;
  }
}

const Share = () => {
  const { pageUrlFull, facebookAppId } = useGlobal();

  const facebookShare = () =>
    FB.ui({
      method: 'share',
      href: pageUrlFull,
    } as facebook.ShareDialogParams);

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          FB.init({
            appId: String(facebookAppId),
            version: 'v13.0',
          })
        }
      />
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
      <div className={styles.share}>
        <ul>
          <li>
            <button onClick={facebookShare}>
              <Icon name="facebook" />
            </button>
          </li>
          <li>
            <a href="https://twitter.com/intent/tweet">
              <Icon name="twitter" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Share;
