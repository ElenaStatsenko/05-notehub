import axios from 'axios';
import type Note from '../types/note';
interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
export const notehubAPI = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export const fetchNotes = async (): Promise<NotesResponse> => {
  const { data } = await notehubAPI.get<NotesResponse>("/notes", {
    params: {
      page: 1,
      perPage: 10,
      sortBy: "created",
    },
  });

  return data;
};