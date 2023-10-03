import { useState, useEffect } from "react"

const useFetch = (url, queryParams = null) => {
  const finalUrl = queryParams ? `${url}?${new URLSearchParams(queryParams).toString()}` : url;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(finalUrl);
    
            if (!response.ok) {
              throw new Error(`error: ${response.status}`);
            }
    
            const jsonData = await response.json();
            setData(jsonData);
            setLoading(false);
            setError(null);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        }
    
        fetchData();
      }, [finalUrl]);

      return { data, loading, error };
}

export default useFetch;