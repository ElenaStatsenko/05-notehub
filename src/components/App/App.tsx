
import css from './App.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import Notelist from '../NoteList/NoteList';

export default function App() {
  const {data} = useQuery({
  queryKey: ['myFetchKey'], 
  queryFn: () => fetchNotes(),   
  
});


  return (
    <div className={css.app}>
	<header className={css.toolbar}>
    <Notelist notes={data?.notes}/>
	
  </header>
</div>
  )
}


