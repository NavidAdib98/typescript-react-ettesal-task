export interface NoteType {
  id: number;
  title: string;
  body: string;
  userId: number;
  source?: "api" | "localstorage";
}
