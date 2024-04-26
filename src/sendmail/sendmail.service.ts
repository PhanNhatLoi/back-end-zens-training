import { BadRequestException, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { configDotenv } from 'dotenv';
import { SendMailDto } from './dto/sendmail.dto';
import { ForgotTemplate } from './template/fogotpassword-html';
configDotenv();

@Injectable()
export class SendmailService {
  async sendmail(sendMail: SendMailDto): Promise<string> {
    const env = process.env;
    const transporter = createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });

    const htmlTemplate = ForgotTemplate(sendMail.content);

    const mailOptions = {
      from: env.SMTP_USER,
      to: sendMail.sendTo,
      subject: sendMail.subject,
      html: htmlTemplate,
    };

    try {
      const res = await transporter.sendMail(mailOptions);
      return res.response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
