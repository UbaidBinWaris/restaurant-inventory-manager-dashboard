import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getApiUrl } from '@/lib/config';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from authenticated API endpoint
        // The token is already in HTTP-only cookie set by the server
        const response = await fetch(getApiUrl('/api/auth/me'), {
          method: 'GET',
          credentials: 'include', // Include HTTP-only cookies
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          // Login with user data (token is already in cookie)
          login(data.data, 'cookie'); // Pass placeholder since token is in HTTP-only cookie
          navigate('/');
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/login?error=oauth_failed');
      }
    };

    fetchUserData();
  }, [login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
