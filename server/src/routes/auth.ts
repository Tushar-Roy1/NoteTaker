import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { generateOTP } from "../utils/generateOTP";
import { sendOTP } from "../utils/mailer";
import { authenticateToken } from "../middleware/auth";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

// ✅ Google Client
const client = new OAuth2Client('1093327250697-5eb788kbntbguj97vh1alms56noi0eom.apps.googleusercontent.com');

/**
 * POST /auth/signup
 */
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  try {
    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    console.log("📩 Email received in signup:", email);
    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err: any) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /auth/verify
 */
router.post("/verify", async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ message: "Email and OTP are required" });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      res.status(401).json({ message: "Invalid OTP or email" });
      return;
    }

    if (user.otpExpires && user.otpExpires < new Date()) {
      res.status(401).json({ message: "OTP has expired" });
      return;
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "OTP verified", token });
  } catch (err: any) {
    console.error("❌ OTP Verify Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /auth/google — Login with Google ID Token
 */
router.post("/google", async (req: Request, res: Response): Promise<void> => {
  const { token: googleToken } = req.body;
  if (!googleToken) {
    res.status(400).json({ message: "Google token is required" });
    return;
  }

  try {
    // ✅ Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      res.status(401).json({ message: "Google verification failed" });
      return;
    }

    // ✅ Find or create user
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({ email: payload.email });
      await user.save();
    }

    // ✅ Issue our own JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email,picture : payload.picture },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Google login successful", token });
  } catch (err: any) {
    console.error("❌ Google Login Error:", err.message);
    res.status(500).json({ message: "Google login failed" });
  }
});

/**
 * GET /auth/me — protected route
 */
router.get("/me", authenticateToken, (req: any, res: Response): void => {
  const user = req.user;
  res.status(200).json({
    message: "You are authenticated",
    user: user && user.userId && user.email
      ? { userId: user.userId, email: user.email }
      : user,
  });
});

export default router;
