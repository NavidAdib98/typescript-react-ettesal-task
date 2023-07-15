import NotesReducer, { NotesReducerStateType } from "./reducer";
describe("NotesReducer", () => {
  let state: NotesReducerStateType;

  beforeEach(() => {
    state = {
      notes: [
        { id: 1, title: "Note 1", body: "Body 1", source: "api", userId: 1 },
        { id: 2, title: "Note 2", body: "Body 2", source: "api", userId: 1 },
        {
          id: 3,
          title: "Note 3",
          body: "Body 3",
          source: "localstorage",
          userId: 1,
        },
      ],
      status: "success",
      error: false,
    };
  });

  it("should return the initial state", () => {
    const action = { type: "UNKNOWN" };
    const nextState = NotesReducer(undefined, action);
    expect(nextState).toEqual({ notes: [], status: "ideal", error: false });
  });

  it("should handle FETCH_SUCCESS", () => {
    const action = { type: "FETCH_SUCCESS", payload: state.notes };
    const nextState = NotesReducer(undefined, action);
    expect(nextState).toEqual(state);
  });

  it("should handle ADD", () => {
    const newNote = {
      id: "4",
      title: "Note 4",
      body: "Body 4",
      source: "api",
      userId: 2,
    };
    const action = { type: "ADD", payload: newNote };
    const nextState = NotesReducer(state, action);
    expect(nextState.notes).toHaveLength(4);
    expect(nextState.notes).toContain(newNote);
  });

  it("should handle REMOVE", () => {
    const noteToRemoveId = 2;
    const action = { type: "REMOVE", payload: noteToRemoveId };
    const nextState = NotesReducer(state, action);
    expect(nextState.notes).toHaveLength(2);
    expect(
      nextState.notes.find((note) => note.id === noteToRemoveId)
    ).toBeUndefined();
  });

  it("should handle EDIT", () => {
    const noteToEditId = 2;
    const editedNote = {
      id: 2,
      title: "Note 2 Edited",
      body: "Body 2 Edited",
    };
    const action = { type: "EDIT", payload: editedNote };
    const nextState = NotesReducer(state, action);
    expect(nextState.notes).toHaveLength(3);

    expect(nextState.notes.find((note) => note.id === noteToEditId)).toEqual({
      ...editedNote,
      source: "api",
      userId: 1,
    });
  });
});
