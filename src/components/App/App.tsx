
import css from './App.module.css';

import { useQuery } from '@tanstack/react-query';
import { useState} from "react";
import Pagination from '../Pagination/Pagination';
import { fetchNotes } from '../../services/noteService';
import Notelist from '../NoteList/NoteList';


export default function App() {
  const [page, setPage] = useState(1);

  const {data, isSuccess} = useQuery({
  queryKey: ['myFetchKey', page], 
  queryFn: () => fetchNotes(page),   
  
});


  return (
    <div className={css.app}>
	<header className={css.toolbar}>
    {isSuccess && data.totalPages > 1 &&( <Pagination 
    pageCount={data?.totalPages ?? 0}
          page={page}
          setPage={setPage}/> )}
    
  </header>
  <Notelist notes={data?.notes}/>
	
</div>
  )
}


