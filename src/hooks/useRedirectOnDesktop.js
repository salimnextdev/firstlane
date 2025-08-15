import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectOnDesktop = (url) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        navigate(url);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);
};

export default useRedirectOnDesktop;
