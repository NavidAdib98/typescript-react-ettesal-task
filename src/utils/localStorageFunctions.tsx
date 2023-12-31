import { NoteType } from "../constants/types";

export function addToLocalStorage(key: string, data: NoteType) {
  const existingValue = localStorage.getItem(key);

  if (existingValue === null || existingValue === undefined) {
    const newArray = [data];
    localStorage.setItem(key, JSON.stringify(newArray));
  } else {
    const parsedValue = JSON.parse(existingValue);

    parsedValue.push(data);

    const updatedValue = JSON.stringify(parsedValue);

    localStorage.setItem(key, updatedValue);
  }
}

export function getFromLocalStorage(key: string): NoteType[] {
  const existingValue = localStorage.getItem(key);

  if (existingValue === null || existingValue === undefined) {
    return [];
  } else {
    const parsedValue = JSON.parse(existingValue);
    return parsedValue as NoteType[];
  }
}

export function getOneItemFromLocalStorage(key: string, id: number): NoteType {
  const local_data: NoteType[] = getFromLocalStorage(key);
  const note: NoteType = local_data.filter((item) => item.id === id)[0];
  return note;
}

export function removeFromLocalStorage(key: string, id: number): void {
  const local_data: NoteType[] = getFromLocalStorage(key);
  const filterd: NoteType[] = local_data.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(filterd));
}

export function editFromLocalStorage(
  key: string,
  id: number,
  title: string,
  content: string
): void {
  const local_data: NoteType[] = getFromLocalStorage(key);
  const filterd: NoteType[] = local_data.filter((item) => item.id !== id);
  let note: NoteType = local_data.filter((item) => item.id === id)[0];
  note.body = content;
  note.title = title;
  localStorage.setItem(key, JSON.stringify([note, ...filterd]));
}
