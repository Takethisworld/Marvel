import { useState, useCallback } from 'react';


const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, header = { 'Content-Type': 'application/json' }) => {
    setLoading(true);

    try {
      const response = await fetch(url, { method, body, headers: header });
      if (!response.ok) {
        throw new Error(`Couldn't fetch ${url} because ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
export default useHttp;