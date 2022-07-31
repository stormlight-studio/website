import type { NextApiRequest, NextApiResponse } from 'next';
import MailazyClient from 'mailazy-node';

interface ContactFormData {
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

interface FormApiRequest extends NextApiRequest {
  body: ContactFormData;
}

interface SendEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
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

  console.log(emailData);

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
    console.log(req.body);

    // const data = JSON.parse(req.body);

    // await sendEmail({
    //   name: data.name,
    //   email: data.email,
    //   subject: `New message from ${name}`,
    //   message: data.message,
    // });

    res.status(200).json({ success: true });
  } catch (e: any) {
    console.log(e.message);
    res.status(500).json({ success: false });
  }
};

export default formHandler;
