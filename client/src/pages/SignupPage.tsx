import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email OTP signup
  const handleSubmit = async () => {
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:4000/auth/signup", { email });
      navigate("/otp", { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google Login Success
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential; // ✅ This is a JWT
      if (!idToken) {
        setError("Google login failed");
        return;
      }

      // Send ID token to backend
      const res = await axios.post("http://localhost:4000/auth/google", {
        token: idToken,
      });

      // Save JWT
      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch (err: any) {
      setError(err.response?.data?.message || "Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transition-transform hover:scale-[1.02] duration-200">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
        Create Your Account
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        Sign up with email OTP or Google to continue.
      </p>

      {error && (
        <p className="text-red-500 text-center mb-4 text-sm font-medium bg-red-50 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg text-white font-semibold shadow-md transition-colors duration-200 ${
          loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      {/* ✅ Google Login */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => setError("Google Login Failed")}
      />
    </div>
  </div>
</GoogleOAuthProvider>

  );
}
