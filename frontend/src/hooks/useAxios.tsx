import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, Method, AxiosProgressEvent } from 'axios';

const DEFAULT_HEADER = axios.defaults.headers.common;

type FetchDataProps = {
  method: Method,
  url: string,
  data?: any,
  headers?: AxiosRequestConfig["headers"];
  onMutuplyUploadProgress?: {
    list: number[];
    set: React.Dispatch<React.SetStateAction<number[]>>;
    index: number;
  };
}

interface UseAxiosReturn<T> {
  isLoading: boolean
  error: string;
  fetchData: any;
  response: T | undefined;

  uploadPercent: number
  multipleFetchData: any;
  responseList: T[] | [];
  uploadPercentList: number[]
}

const useAxios = <T,>(): UseAxiosReturn<T> => {
  // const [response, setResponse] = useState<Response>(initResponse);
  const [response, setResponse] = useState<T>();
  const [responseList, setResponseList] = useState<T[]>([]);
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [uploadPercentList, setUploadPercentList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const fetchData = async (
    method: Method = 'GET', 
    url: string = '',
    data: any = {},
    headers: AxiosRequestConfig["headers"] = {},
    onMutuplyUploadProgress: FetchDataProps['onMutuplyUploadProgress'] = {
      list: [],
      set: () => {},
      index: 0,
    },
  ) => {

    setIsLoading(true);
    const axiosConfig = {
      method: method,
      url: url,
      headers: { ...headers, ...DEFAULT_HEADER},
      data: data,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        setUploadPercent(0);
        const loaded = progressEvent.loaded;
        const total = progressEvent.total || 0;
        const percentCompleted = Math.round((loaded * 100) / total);
        if (percentCompleted > 80) {
          setUploadPercent(80);
        } else {
          setUploadPercent(percentCompleted);
        }
        if (onMutuplyUploadProgress &&
          onMutuplyUploadProgress.list &&
          onMutuplyUploadProgress.index &&
          onMutuplyUploadProgress.set) {
          const newUploadPercent = [...onMutuplyUploadProgress.list];
          newUploadPercent[onMutuplyUploadProgress.index] = percentCompleted;

          console.log(
            'index:', onMutuplyUploadProgress.index,
            'percentCompleted: ', percentCompleted,
            'newUploadPercent: ', newUploadPercent,
            'len:', newUploadPercent.length
          )
          // if (percentCompleted > 80) {
          //   newUploadPercent[onMutuplyUploadProgress.index] = 80;
          // } else {
          //   newUploadPercent[onMutuplyUploadProgress.index] = percentCompleted;
          // }
          onMutuplyUploadProgress.set(newUploadPercent)
        }
      },
    };
    try {
      console.log(axiosConfig.data)
      const result = await axios<T>(axiosConfig);

      setResponse(result.data);
      setUploadPercent(100)
    } catch (error) {
      console.log(error)
      setError('An error occurred while fetching the api.');
      setUploadPercent(0)
    }
    setIsLoading(false);
  };

  // mutiple fetch data with diffrent config
  const multipleFetchData = async (
    method: Method,
    url: string,
    datas: any[],
    headers?: {},
  ) => {
    setIsLoading(true);
    try {
      setUploadPercentList(new Array(datas.length).fill(0));
      const responses = await axios.all(
        datas.map((data, index) => {
          const axiosConfig = {
            method: method,
            url: url,
            headers: headers,
            data: data,
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              setUploadPercent(0);
              const loaded = progressEvent.loaded;
              const total = progressEvent.total || 0;
              const percentCompleted = Math.round((loaded * 100) / total);
              const newUploadPercentList = [...uploadPercentList];
              newUploadPercentList[index] = percentCompleted;
              setUploadPercentList(newUploadPercentList);
            }
          }
          return axios<T>(axiosConfig)
        })
      );
      console.log(responses)
      const responsesFormat = responses.map((response) => (response.data));
      setResponseList(responsesFormat);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
  }, [responseList]);
  return {
    isLoading, error,
    fetchData, response, uploadPercent,
    multipleFetchData, responseList, uploadPercentList,
  };
};

export default useAxios;
