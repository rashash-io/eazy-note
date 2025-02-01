import { useNotesList } from '@renderer/hooks/useNotesList'
import { NoteInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { NotePreviewListProps } from './NotePreviewList'
import { NotesList } from './NotesList'

const indexedNotes = (note) => note.map((n: string[], i: number) => ({ ...n, ogindex: i })) // the object doesnt loose the original index

export const useSearchNotes = (keyword: string) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList()
  const [filteredNotesState, setFilteredNotesState] = useState<NoteInfo[]>([])
  useEffect(() => {
    if (notes) {
      const indexedNotesObj = indexedNotes(notes)

      const filteredObjNote = indexedNotesObj.filter((note) =>
        Object.values(note).some((val) => typeof val === 'string' && val.includes(keyword))
      )
      setFilteredNotesState(filteredObjNote)
    }
  }, [keyword, notes])

  return { filteredNotesState }
}

export const NoteSearch = ({ onSelect, ...props }: NotePreviewListProps) => {
  const [filteredNotesState, setFilteredNotesState] = useState<NoteInfo[]>([])
  const [keyword, setKeyword] = useState('')
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList()

  useEffect(() => {
    if (notes) {
      const indexedNotesObj = indexedNotes(notes)

      const filteredObjNote = indexedNotesObj.filter((note) =>
        Object.values(note).some((val) => typeof val === 'string' && val.includes(keyword))
      )
      setFilteredNotesState(filteredObjNote)
    }
  }, [keyword, notes])

  return (
    <>
      <input
        type="text"
        className="w-full bg-slate-950/50 rounded-lg px-2 py-3 my-4  outline-none ring-1 ring-sky-600"
        placeholder="search for a note"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <NotesList filteredNotes={filteredNotesState} onSelect={onSelect} {...props} />
    </>
  )
}
