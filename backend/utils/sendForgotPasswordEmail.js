import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendForgotPasswordEmail(receiverEmail, id) {
  const subject = "SB Fitness Gym | Forgot Password";
  const resetLink =
    process.env.BACKEND_URL + "/auth/forgot-password-reset/" + id;

  const html = `<div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2>SB Fitness Gym | Password Reset Request</h2>
      <p>You requested to reset your password.</p>
      <p>
        Click the link below to set a new password.
        This link will expire in <b>10 minutes.</b>
      </p>
      <a
        href="${resetLink}"
        style="
          display: inline-block;
          margin-top: 16px;
          padding: 12px 20px;
          background: #2563eb;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
        "
      >
        Reset Password
      </a>
      <p style="margin-top: 20px; font-size: 13px; color: #555;">
        If you did not request this, you can safely ignore this email.
      </p>
    </div>`;

  try {
    const msg = {
      receiverEmail,
      from: process.env.SENDER_EMAIL,
      subject,
      html,
    };

    await sgMail.send(msg);
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);
    throw new Error("Failed to send email");
  }
}

export default sendForgotPasswordEmail;


///GLEHEUTHBDFKGJWDLHULK
// CONDOWBGKGJEGJOWEFJHOSHSCONDO M 