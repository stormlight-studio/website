import React, {
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useGlobal } from '../../context/Global';
import Container from '../layout/Container';
import RichText from '../components/RichText';
import { IContactForm } from '../../@types/generated/contentful';
import styles from '../../styles/components/components/Form.module.scss';
import Icon from '../assets/Icon';

type FormStatus = 'user' | 'sending' | 'success' | 'error';
export type FormType = 'contact';

interface FormProps {
  fields: {
    name: string;
    placeholder: string;
    autoComplete?: string;
    type?: 'textarea' | 'select' | 'tel' | 'email' | 'file';
    required?: boolean;
    rows?: number;
    options?: string[];
  }[];
  block: 'contactForm';
  className?: string;
  children?: ReactNode;
}

interface ContactFormProps extends IContactForm, FormProps {}

const Form = (props: ContactFormProps) => {
  const {
    hashId,
    title,
    formTitle,
    formDescription,
    successText,
    failureText,
    submitText,
    fields,
    className,
    block,
    children,
  } = props;

  const formBoxRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { googleReCaptchaSiteKey } = useGlobal();

  const [status, setStatus] = useState<FormStatus>('user');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (recaptchaRef.current) {
        await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
      }

      const formData = new FormData(formRef.current!);
      const { status } = await fetch('/api/form', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      setStatus(status === 200 ? 'success' : 'error');
    } catch (_e) {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'success' && formRef.current) {
      formRef.current.reset();
    }
  }, [status, formBoxRef]);

  return (
    <div id={hashId} className={className} data-block={block}>
      <Container>
        <div ref={formBoxRef} className={styles.formBox}>
          {status === 'sending' && <Icon name="loading" />}
          {status === 'success' && <RichText>{successText}</RichText>}
          {status === 'error' && (
            <>
              <RichText>{failureText}</RichText>
              <br />
              <hr />
              <br />
            </>
          )}
          {['user', 'error'].includes(status) && (
            <>
              <h2 className={styles.formTitle}>{formTitle}</h2>
              <p className={styles.formDescription}>{formDescription}</p>
            </>
          )}
          <form
            ref={formRef}
            className={styles.form}
            onSubmit={onSubmit}
            hidden={['sending', 'success'].includes(status)}
          >
            {fields.map((field) => {
              if (field.type === 'textarea') {
                return (
                  <textarea
                    key={field.name}
                    name={field.name}
                    rows={field.rows}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                );
              }

              if (field.type === 'select' && field.options?.length) {
                return (
                  <select
                    key={field.name}
                    name={field.name}
                    required={field.required}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              }

              return (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  required={field.required}
                />
              );
            })}
            <div>
              <button className="button">{submitText}</button>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={googleReCaptchaSiteKey}
              />
            </div>
          </form>
        </div>
        {children}
      </Container>
    </div>
  );
};

export default Form;
