import css from "./App.module.css";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { fetchNotes } from "../../services/noteService";
import Notelist from "../NoteList/NoteList";
import Modal from "../Modal/Modal";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["myFetchKey", page],
    queryFn: () => fetchNotes(page),
    placeholderData: keepPreviousData,
  });
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pageCount={data?.totalPages ?? 0}
            page={page}
            setPage={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      <Notelist notes={data?.notes} />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}
