import { useGlobal } from '../../context/Global';
import Container from '../layout/Container';
import Menu from '../layout/Menu';
import Icon from '../assets/Icon';
import Form from '../components/Form';
import styles from '../../styles/components/layout/Footer.module.scss';

const Footer = () => {
  const { footerEmailForm, footerMenuItems } = useGlobal();

  return (
    <footer className={styles.footer}>
      <Form
        type="subscribe"
        fields={[
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email address',
            autoComplete: 'email',
            required: true,
          },
        ]}
        {...footerEmailForm}
      />
      <Container>
        <Icon name="logo" className={styles.logo} />
        <Menu menuItems={footerMenuItems} />
      </Container>
    </footer>
  );
};

export default Footer;
