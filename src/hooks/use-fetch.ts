import { useState } from "react";

const BASE_URI = process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";

type UseFetchCallback<T> = {
  isLoading: boolean
  error: string | null
  data: T | null
  get: (uriFragmant: string) => void
}

const _fetch = async (url: string) => {
  try{
    const response = await fetch(url);
    if(!response.ok) {
     throw new Error(response.statusText);
    }
    const result = await response.json();
    return result;
  }catch(err: any) {
    throw new Error("Something went wrong")
  }
}
export const useFetch = <T>(): UseFetchCallback<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T | null>(null);

  const get = async (uriFragmant: string) => {
    setIsLoading(true);
    try {
      const data = await _fetch(`${BASE_URI}/${uriFragmant}`)
      setData(data);
      setError(null);
    } catch(err: any) {
      setError(err.message)
    }
    setIsLoading(false);
  }

  return {
    isLoading,
    error,
    data,
    get
  }
}