import sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY } = process.env;

if (!SENDGRID_API_KEY) {
	throw new Error('SENDGRID_API_KEY is not defined');
}

interface EmailData {
	to: string;
	subject: string;
	html: string;
}

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendMail = async (data: EmailData): Promise<boolean> => {
	const email = { ...data, from: 'shrebtan@gmail.com' };
	await sgMail.send(email);
	return true;
};
