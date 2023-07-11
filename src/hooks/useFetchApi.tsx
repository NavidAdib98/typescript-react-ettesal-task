import { useState, useEffect } from "react";
import { NoteType } from "../constants/types";
import { getData } from "../utils/api";

export default function useFetchApi(url: string) {
  const [data, setData] = useState<NoteType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("ideal");

  useEffect(() => {
    setStatus("loading");
    setError(false);
    getData(url)
      .then((data) => {
        data.forEach((d: NoteType) => {
          d.source = "api";
        });
        setData(data);
        setStatus("success");
      })
      .catch((error) => {
        setError(true);
        setStatus(error.message);
      });
  }, [url]);

  return { data, status, error };
}
