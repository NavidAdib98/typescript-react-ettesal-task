import { useState, useEffect } from "react";
import { NoteType } from "../constants/types";

//utils
import { getFromLocalStorage } from "../utils/localStorageFunctions";

export default function useGetLocalStorage() {
  const [data, setData] = useState<NoteType[]>([]);
  useEffect(() => {
    let data_storage: NoteType[] = getFromLocalStorage();
    setData(data_storage);
  }, []);

  return { data };
}
