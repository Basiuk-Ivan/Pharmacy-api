import nodemailer from 'nodemailer';
import HTML_TEMPLATE from './mailTemplate.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // tls: { rejectUnauthorized: false },
});

export const sendMailOrder = async ({ products, email, totalPrice }) => {
  const productsList = products.map(
    ({ name, price, quantity }) =>
      `<li>${name} ціна: ${price} грн    кількість: ${quantity} шт  разом: ${
        price * quantity
      } грн </li>`
  );
  const message = `<p>Привіт, шановний клієнт. Це ваше замовлення </p>
        <ul>${productsList}</ul>
        <hr>
        <div style="text-align: right">РАЗОМ:  ${totalPrice} грн</div>
        `;
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Ваше замовлення від сайту Pharmacy ',
    text: 'message',
    html: HTML_TEMPLATE(message),
  });
};

export const sendMailRegistration = async ({
  email,
  firstName,
  secondName,
  password,
}) => {
  console.log({ email, firstName, secondName, password });
  const message =
    'Привіт, шановний(на) ' +
    firstName +
    ' ' +
    secondName +
    '.Ваша реєстрація успішна. Ваша пошта: ' +
    email +
    ', Ваш пароль: ' +
    password;
  await transporter.sendMail({
    from: 'pharmacy_shop@ukr.net',
    to: email,
    subject: 'Ваші реєстраційні дані на сайті Pharmacy ',
    text: message,
    html: HTML_TEMPLATE(message),
  });
};
