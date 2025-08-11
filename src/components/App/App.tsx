
import css from './App.module.css';
import { useQuery } from '@tanstack/react-query';
import { useState} from "react";
import ReactPaginate from "react-paginate";
import { fetchNotes } from '../../services/noteService';
import Notelist from '../NoteList/NoteList';


export default function App() {
  const {data} = useQuery({
  queryKey: ['myFetchKey'], 
  queryFn: () => fetchNotes(),   
  
});
const [page, setPage] = useState(1);


  return (
    <div className={css.app}>
	<header className={css.toolbar}>
    <Notelist notes={data?.notes}/>
	<ReactPaginate
          pageCount={data?.totalPages ?? 0}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
  </header>
</div>
  )
}


