import {
  addToLocalStorage,
  getFromLocalStorage,
  getOneItemFromLocalStorage,
  removeFromLocalStorage,
  editFromLocalStorage,
} from "./localStorageFunctions";
import { NoteType } from "../constants/types";

describe("LocalStorage Utils", () => {
  const key: string = "UserDataTest";
  const note1: NoteType = {
    userId: 1,
    source: "localstorage",
    id: 1,
    title: "Note 1",
    body: "This is a note.",
  };
  const note2: NoteType = {
    id: 2,
    userId: 3,
    source: "localstorage",
    title: "Note 2",
    body: "This is another note.",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  describe("addToLocalStorage", () => {
    it("should add a new note to local storage", () => {
      addToLocalStorage(key, note1);
      const expectedValue: NoteType[] = [note1];
      const valueInLocalStorage = localStorage.getItem(key);
      expect(JSON.parse(valueInLocalStorage!)).toEqual(expectedValue);
    });

    it("should add a new note to existing notes in local storage", () => {
      const existingNotes: NoteType[] = [note1];
      localStorage.setItem(key, JSON.stringify(existingNotes));
      addToLocalStorage(key, note2);
      const expectedValue: NoteType[] = [note1, note2];
      const valueInLocalStorage = localStorage.getItem(key);
      expect(JSON.parse(valueInLocalStorage!)).toEqual(expectedValue);
    });
  });

  describe("getFromLocalStorage", () => {
    it("should return an empty array if there are no notes in local storage", () => {
      const notes = getFromLocalStorage(key);
      expect(notes).toEqual([]);
    });

    it("should return all notes in local storage", () => {
      const existingNotes: NoteType[] = [note1, note2];
      localStorage.setItem(key, JSON.stringify(existingNotes));
      const notes = getFromLocalStorage(key);
      expect(notes).toEqual(existingNotes);
    });
  });

  describe("getOneItemFromLocalStorage", () => {
    it("should return the note with the given id", () => {
      const existingNotes: NoteType[] = [note1, note2];
      localStorage.setItem(key, JSON.stringify(existingNotes));
      const note = getOneItemFromLocalStorage(key, 2);
      expect(note).toEqual(note2);
    });

    it("should return undefined if the note with the given id does not exist", () => {
      const existingNotes: NoteType[] = [note1, note2];
      localStorage.setItem(key, JSON.stringify(existingNotes));
      const note = getOneItemFromLocalStorage(key, 3);
      expect(note).toBeUndefined();
    });
  });

  describe("removeFromLocalStorage", () => {
    it("should remove the note with the given id", () => {
      const existingNotes: NoteType[] = [note1, note2];
      localStorage.setItem(key, JSON.stringify(existingNotes));
      removeFromLocalStorage(key, 2);
      const remainingNotes: NoteType[] = [note1];
      const valueInLocalStorage = localStorage.getItem(key);
      expect(JSON.parse(valueInLocalStorage!)).toEqual(remainingNotes);
    });
  });

  describe("editFromLocalStorage", () => {
    it("should edit the note with the given id", () => {
      const existingNotes: NoteType[] = [note1, note2];
      localStorage.setItem(key, JSON.stringify(existingNotes));
      editFromLocalStorage(key, 2, "New Title", "New Content");
      const expectedNote: NoteType = {
        id: 2,
        userId: 3,
        source: "localstorage",
        title: "New Title",
        body: "New Content",
      };
      const valueInLocalStorage = JSON.parse(localStorage.getItem(key)!);
      expect(valueInLocalStorage).toContainEqual(expectedNote);
    });
  });
});
