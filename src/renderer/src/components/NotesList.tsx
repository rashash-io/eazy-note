/* ---------------- LISTING NOTES INFO COMPONENT ---------------- */

import { useNotesList } from '@renderer/hooks/useNotesList'
import { NoteInfo } from '@shared/models'
import { NotePreview } from './NotePreview'

type NotesListProps = {
  filteredNotes: NoteInfo[]
  onSelect?: () => void
} & React.HTMLAttributes<HTMLUListElement>

export const NotesList = ({ filteredNotes, onSelect, ...props }: NotesListProps) => {
  const { selectedNoteIndex, handleNoteSelect } = useNotesList()
  return (
    <ul className="my-4" {...props}>
      {filteredNotes.map((note) => (
        <NotePreview
          {...note}
          className="my-2"
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === note['ogindex']}
          onClick={handleNoteSelect(note['ogindex'])}
        />
      ))}
    </ul>
  )
}
