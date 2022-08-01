import type { NextApiRequest, NextApiResponse } from 'next';
import MailazyClient from 'mailazy-node';
import formidable from 'formidable';
import { FormType } from '../../components/components/Form';

interface SubscribeFormData {
  type: 'subscribe';
  email: string;
}

interface ContactFormData {
  type: 'contact';
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

interface SendEmailData {
  email: string;
  subject: string;
  message: string;
}

type FormData = SubscribeFormData | ContactFormData;

interface FormApiRequest extends NextApiRequest {
  body: {
    type: FormType;
    [key: string]: string;
  };
}

const sendEmail = async ({
  email,
  subject,
  message,
}: SendEmailData): Promise<void> => {
  const mailazy = new MailazyClient({
    accessKey: process.env.MAILAZY_ACCESS_KEY,
    accessSecret: process.env.MAILAZY_ACCESS_SECRET,
  });

  const emailData = {
    to: process.env.CONTACT_FORM_RECIPIENT,
    from: 'no-reply@stormlightstudio.co.uk', // Verified domain, required
    subject,
    text: message,
    reply_to: email,
  };

  const responseJSON = await mailazy.send(emailData);

  const response = JSON.parse(responseJSON);
  if (response.error && response.error_code) {
    throw new Error(
      process.env.NODE_ENV ? response.error : 'Error sending email.'
    );
  }
};

const formHandler = async (req: FormApiRequest, res: NextApiResponse) => {
  try {
    let subject;
    let message;

    const data: FormData = await new Promise((resolve, reject) => {
      const form = formidable();
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err);
        resolve({ ...fields, ...files } as unknown as FormData);
      });
    });

    switch (data.type) {
      case 'subscribe':
        subject = `New blog subscriber`;
        message = `New blog subscriber: ${data.email}`;
        break;

      case 'contact':
        subject = `New message from ${data.name}`;
        message = data.message;
        if (data.phoneNumber) {
          message += `\n\nPhone Number: ${data.phoneNumber}`;
        }
        break;
    }

    await sendEmail({
      email: data.email,
      subject,
      message,
    });

    res.status(200).json({ success: true });
  } catch (e: any) {
    console.log(e.message);
    res.status(500).json({ success: false });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default formHandler;
