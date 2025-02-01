import { useNotesList } from '@renderer/hooks/useNotesList'
import { NoteInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { NotePreview } from './NotePreview'
import { NotePreviewListProps } from './NotePreviewList'

export const NoteSearch = ({ onSelect, ...props }: NotePreviewListProps) => {
  const [filteredNotesState, setFilteredNotesState] = useState<NoteInfo[]>([])
  const [keyword, setKeyword] = useState('')
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

  useEffect(() => {
    if (notes) {
      const indexedNotesObj = indexedNotes(notes)

      const filteredObjNote = indexedNotesObj.filter((note) =>
        Object.values(note).some((val) => typeof val === 'string' && val.includes(keyword))
      )
      setFilteredNotesState(filteredObjNote)
    }
    console.log('filteredNotesState', filteredNotesState)

    console.log('Notes', notes)
  }, [keyword, notes])

  const indexedNotes = (note) => note.map((n: string[], i: number) => ({ ...n, ogindex: i }))
  return (
    <div>
      <input
        type="text"
        className="bg-inherit outline"
        onChange={(e) => setKeyword(e.target.value)}
      />
      Keyword: {keyword}
      <ul>
        {filteredNotesState.map((note) => (
          <NotePreview
            key={note.title + note.lastEditTime}
            isActive={selectedNoteIndex === note['ogindex']}
            onClick={handleNoteSelect(note['ogindex'])}
            {...note}
          />
        ))}
      </ul>
    </div>
  )
}
