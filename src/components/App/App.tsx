import css from "./App.module.css";

import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import Pagination from "../Pagination/Pagination";
import { fetchNotes } from "../../services/noteService";
import Notelist from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessageComponent/ErrorMessageComponent";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setPage(1);
  }, [search]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSetSearch} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pageCount={data?.totalPages ?? 0}
            page={page}
            setPage={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <Notelist notes={data?.notes} />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}
    </div>
  );
}
