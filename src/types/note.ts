export default interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}