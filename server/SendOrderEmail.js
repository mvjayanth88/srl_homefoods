import nodemailer from 'nodemailer';

export const sendEmailToBusiness = async (orderDetails) => {
  const orderData = orderDetails.orderData;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mvjayanth88@gmail.com',
      pass: 'npkb ttos pxan xmia', // from App Passwords
    },
  });

  const mailOptions = {
    from: 'mvjayanth88@gmail.com',
    to: `${orderData.customer_email}`,
    subject: `New Order Received: ${orderData.id}`,
    text: `
      Customer Name: ${orderData.customer_name}
      Customer Mobile: ${orderData.customer_mobile}
      Customer Email: ${orderData.customer_email}
      Order ID: ${orderData.id}
      Amount: ₹${orderData.total_amount}
      Items: ${
              Array.isArray(orderDetails.items)
              ? orderDetails.items
              .map(item => `- ${item.name}: ${item.weight} KG x ${item.quantity}`)
              .join('\n')
              : 'No items provided'
              }
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to business owner');
  } catch (err) {
    console.error('Email error:', err.message);
  }
};
