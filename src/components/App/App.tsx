
import css from './App.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';

export default function App() {
  const {data} = useQuery({
  queryKey: ['myFetchKey'], 
  queryFn: () => fetchNotes(),   
  
});
console.log(data?.notes) 

  return (
    <div className={css.app}>
	<header className={css.toolbar}>
    <p> Hello </p>
	
  </header>
</div>
  )
}


