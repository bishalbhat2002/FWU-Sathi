import EmailVerification from "../models/emailVerification.model.js";
import { sendMail } from "./SendMail.js";

const generate6DigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateEmailVerificationCode = async (email) => {
  try {
    // Delete all previous unused codes for this email
    await EmailVerification.deleteMany({ email, used: false });

    // Generate new 6-digit code
    const code = generate6DigitCode();

    // Store in database
    await EmailVerification.create({
      email,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),          // 10 minutes expiry
      used: false,
    });

    const info = await sendMail(email, code);
    if (info.accepted.length > 0) {
      return true;
    }

    // The email coulnt be sent...
    return false;
  } catch (error) {
    console.error("Error creating email verification code:", error);
    // The email couldn't be sent..
    return false;
  }
};


// Verify the OTP code...
export const verifyEmailCode = async (email, code) => {
  try {
    // Find a matching unused code that is not expired
    const record = await EmailVerification.findOne({
      email,
      code,
      used: false,
      expiresAt: { $gt: new Date() },             // code not expired
    });

    if (!record) {
      return { success: false, message: "Invalid or expired code" };
    }

    // Mark the code as used
    record.used = true;            // Here, we updated the record on memory.
    await record.save();           // This 'save()' function saves the changes done on memory permantely on the database.

    return true;

  } catch (error) {
    console.log("Error while verifying email code: ", error.message);
    return false;
  }
};
