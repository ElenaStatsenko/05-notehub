import axios from 'axios';
import type Note from '../types/note';
export default interface NotesResponse {
  notes: Note[];
  totalPages: number;
  page: number,
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
export const notehubAPI = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export const fetchNotes = async (page: number= 1): Promise<NotesResponse> => {
  const { data } = await notehubAPI.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      
    },
  });

  return data;
};