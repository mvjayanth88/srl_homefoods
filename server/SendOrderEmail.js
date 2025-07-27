import nodemailer from 'nodemailer';

export const sendEmailToBusiness = async (orderDetails) => {
  const orderData = orderDetails.orderData;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajyalakshmi.homefoods.hyd@gmail.com',
      pass: 'zwvv nskb rmfh hoyd', // from App Passwords
    },
  });

  const mailOptions_forCustomer = {
    from: 'rajyalakshmi.homefoods.hyd@gmail.com',
    to: `${orderData.customer_email}`,
    subject: `New Order Received: ${orderData.id}`,
    html: `
<header style="background-color: #ff7a30; padding: 5px 15px; display: block;">
            <img src="https://mvjayanth88.github.io/srl_homefoods/assets/logo.png" width="180px" style="display: inline-block;" />
        </header>
        <section style="background-color: #e9e3df; padding: 30px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
          <div>
      <h2 style="color: #465C88;">New Order Notification - ${orderData.id}</h2>
      <p><strong>Customer Name:</strong> ${orderData.customer_name}</p>
      <p><strong>Email:</strong> ${orderData.customer_email}</p>
      <p><strong>Phone:</strong> ${orderData.customer_mobile}</p>
      <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Order ID:</strong> ${orderData.id}</p>

      <h3 style="margin-top: 20px;">Order Details:</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background-color: #465C88; color: white; text-align: left;">
            <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Weight</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${Array.isArray(orderDetails.items)
              ? orderDetails.items.map(
              item => `
            <tr style="background-color: white;">
              <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.weight}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">₹${item.price}</td>
            </tr>
          `
            )
            .join(""): 'No items provided'}
        </tbody>
      </table>
      <p style="margin-top: 20px;"><strong>Total Amount:</strong> ₹${orderData.total_amount}</p>
      
      <p style="margin-top: 20px;">Please process this order as soon as possible.</p>

      <p>Regards,<br />
      Rajyalakshmi Home Foods System</p>
    </div>
        </section>
    `,
  };

    const mailOptions_forBusiness = {
    from: 'rajyalakshmi.homefoods.hyd@gmail.com',
    to: 'rajyalakshmi.homefoods.hyd@gmail.com',
    subject: `New Order Received: ${orderData.id}`,
    html: `
      <header style="background-color: #ff7a30; padding: 5px 15px; display: block;">
            <img src="https://mvjayanth88.github.io/srl_homefoods/assets/logo.png" width="180px" style="display: inline-block;" />
        </header>
        <section style="background-color: #e9e3df; padding: 30px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
          <h2 style="color: #c0392b;">Thank you for your order!</h2>
      <p>Dear ${orderData.customer_name},</p>
      
      <p>We've received your order and will start preparing it shortly. Every item is made fresh to ensure the best taste and quality.</p>

      <p><strong>Order Details:</strong></p>
      <ul>
        <li><strong>Order ID:</strong> ${orderData.id}</li>
        <li><strong>Date:</strong> ${date}</li>
      </ul>

      <p>You'll receive another update when your order is packed and ready for dispatch.</p>

      <p>Thanks again for choosing <strong>Rajyalakshmi Home Foods</strong>!</p>

      <p style="margin-top: 30px;">Warm regards,<br />
      <strong>Rajyalakshmi Home Foods</strong><br />
      📞 +91-6302417541<br />
      📍 Hyderabad, Telangana
      </p>
        </section>
    `,
  };


  try {
    await transporter.sendMail(mailOptions_forCustomer);
    console.log('Email sent to business owner');
  } catch (err) {
    console.error('Email error:', err.message);
  }

  try {
    await transporter.sendMail(mailOptions_forBusiness);
    console.log('Email sent to business owner');
  } catch (err) {
    console.error('Email error:', err.message);
  }

};
