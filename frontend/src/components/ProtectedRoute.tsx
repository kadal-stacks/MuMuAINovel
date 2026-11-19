import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { authApi } from '../services/api';
import { sessionManager } from '../utils/sessionManager';
import i18n from '../i18n';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authApi.getCurrentUser();
        try {
          await i18n.changeLanguage(user.preferred_language || 'id');
        } catch (localeError) {
          console.warn('Could not apply the saved interface language:', localeError);
        }

        setIsAuthenticated(true);
        sessionManager.start();
      } catch {
        setIsAuthenticated(false);
        sessionManager.stop();
      }
    };
    checkAuth();

    return () => {
      // Keep the session manager active across route changes.
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
}
