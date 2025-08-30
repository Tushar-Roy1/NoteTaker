import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError('');
    if (!otp) {
      setError('OTP is required');
      return;
    }

    try {
      setLoading(true);
         const res = await axios.post('http://localhost:4000/auth/verify', { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/notes');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Enter OTP</h2>

        {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Enter the 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-semibold transition-colors duration-200 ${
            loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
    </div>
  );
}
