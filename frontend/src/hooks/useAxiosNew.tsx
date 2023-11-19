import { useState, useEffect, useCallback, useRef } from "react";
import axios, { AxiosRequestConfig } from 'axios';


interface UseAxiosReturn<T> {
  loading: boolean
  error: string;
  fetchData: any;
  response: T | undefined;
}

const useAxiosNew = <T,>(axiosParams: AxiosRequestConfig): UseAxiosReturn<T> => {
  const axiosParamsRef = useRef(axiosParams);
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

  const sendData = useCallback(async (params: AxiosRequestConfig) => {
    try {
      setLoading(true)
      const result = await axios<T>(params);
      setResponse(result.data);
    } catch (err) {
      console.log(err);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchData = useCallback(async (params: AxiosRequestConfig) => {
    const newParams = { ...axiosParamsRef.current, ...params };
    await sendData(newParams);
  }, [sendData])

  useEffect(() => {
    if (axiosParams.method === "GET" || axiosParams.method === "get") {
      sendData(axiosParamsRef.current)
    }
  }, [axiosParams.method, sendData]);

  return {
    loading, error, fetchData, response
  };
}

export default useAxiosNew;
