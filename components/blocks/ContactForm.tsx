import { useGlobal } from '../../context/Global';
import Link from '../components/Link';
import Form from '../components/Form';
import { IContactForm } from '../../@types/generated/contentful';
import styles from '../../styles/components/blocks/ContactForm.module.scss';

const ContactForm = (props: IContactForm) => {
  const { phoneNumber, email, googleMapsLink } = useGlobal();

  return (
    <Form
      type="contact"
      fields={[
        {
          name: 'name',
          placeholder: 'Name',
          autoComplete: 'name',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email address',
          autoComplete: 'email',
          required: true,
        },
        {
          name: 'phoneNumber',
          type: 'tel',
          placeholder: 'Phone number (optional)',
          autoComplete: 'tel',
        },
        {
          name: 'message',
          type: 'textarea',
          placeholder: 'Message',
          rows: 6,
          required: true,
        },
      ]}
      className={styles.contactForm}
      {...props}
    >
      <div className={styles.contactPoints}>
        <div>
          <small>Give us a ring</small>
          <Link href={`tel:${phoneNumber}`} text={phoneNumber} />
        </div>
        <div>
          <small>Email us direct</small>
          <Link href={`mailto:${email}`} text={email} />
        </div>
        <div>
          <small>Come and see us</small>
          <p>We&apos;re in Leeds!</p>
          {googleMapsLink && (
            <Link href={googleMapsLink} className="textLink" target="_blank">
              Find us on google maps
            </Link>
          )}
        </div>
      </div>
    </Form>
  );
};

export default ContactForm;
