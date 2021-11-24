import { useEffect, useState } from 'react';
import { PAGE_NUM } from '../constants/pageData';

export default function useHttp(query = '', filterData = '', pageNumber = 1, callAPI = async () => { }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setData([]);
  }, [query, filterData]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const updateData = async () => {
      try {
        let resp = await callAPI(pageNumber);

        setData(prevData => { return [...prevData, ...resp.data]; });
        setHasMore(resp.data.length === PAGE_NUM);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    const delay = setTimeout(() => {
      updateData();
    }, 500);

    return () => {
      clearTimeout(delay);
    };
  }, [query, filterData, pageNumber]);
  return { loading, error, data, hasMore };
}
