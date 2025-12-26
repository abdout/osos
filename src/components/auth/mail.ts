import { Resend } from "resend";

// Lazy initialization to avoid errors when API key is not configured
let resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not configured. Email sending is disabled.");
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const domain = process.env.NEXT_PUBLIC_APP_URL;
const emailFrom = process.env.EMAIL_FROM || "noreply@mazin.sd";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const client = getResendClient();
  if (!client) {
    console.log("Email sending disabled - 2FA code:", token);
    return;
  }

  try {
    const response = await client.emails.send({
      from: emailFrom,
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA code: ${token}</p>`,
    });

    console.log("2FA email sent successfully, response:", response);
  } catch (error) {
    console.error("Error sending 2FA email:", error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;
  const client = getResendClient();
  if (!client) {
    console.log("Email sending disabled - reset link:", resetLink);
    return;
  }

  try {
    const response = await client.emails.send({
      from: emailFrom,
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });

    console.log("Password reset email sent successfully, response:", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;
  const client = getResendClient();
  if (!client) {
    console.log("Email sending disabled - confirm link:", confirmLink);
    return;
  }

  try {
    const response = await client.emails.send({
      from: emailFrom,
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
      text: `Click the following link to confirm your email: ${confirmLink}`
    });

    console.log("Verification email sent successfully, response:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }
};
