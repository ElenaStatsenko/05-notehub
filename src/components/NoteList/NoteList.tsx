
import css from './NoteList.module.css'
import type Note from '../../types/note'
interface NotelistProps {
    notes?: Note[];
}

export default function Notelist({ notes }: NotelistProps) {
  return (
    <ul className={css.list}>
      {notes?.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}