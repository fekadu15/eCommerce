import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOrderEmail = async (
  to: string,
  orderId: string,
  total: number,
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Order Confirmation",
    html: `
      <h2>Order Confirmed</h2>
      <p>Your order has been placed successfully.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total:</strong> $${total}</p>
      <p>Thank you for shopping with us!</p>
    `
  });
};