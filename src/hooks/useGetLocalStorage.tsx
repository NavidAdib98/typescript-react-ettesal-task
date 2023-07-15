import { useState, useEffect } from "react";
import { NoteType } from "../constants/types";

//utils
import { getFromLocalStorage } from "../utils/localStorageFunctions";
//keys
import { key_Notes } from "../constants/localStorageKeys";

export default function useGetLocalStorage() {
  const [data, setData] = useState<NoteType[]>([]);
  useEffect(() => {
    let data_storage: NoteType[] = getFromLocalStorage(key_Notes);
    setData(data_storage);
  }, []);

  return { data };
}
