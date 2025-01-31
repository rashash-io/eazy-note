import { NoteContent, NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  //Sort them by most recently edited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

//Unwrap used to transfer async to sync functions
//it returns the value w/out promise when its resolved
//if not resolved, we will return the previous value
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)
export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]

  const noteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent.content
  }
})
//in case previous note is null / undefined return empty content
export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) => prev ?? { title: '', content: '' as string, lastEditTime: Date.now() }
)
export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  //save to disk
  await window.context.writeNote(selectedNote.title, newContent)

  //update last edit time
  set(
    notesAtom,
    notes.map((note) => {
      //this is the note we want to update
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })
  )
})
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const title = await window.context.createNote()
  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }
  console.log(notesAtom)
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]) // we're keeping the notes that doesnt have the same name as new note
  // we are updating the list of notes
  set(selectedNoteIndexAtom, 0) // to put the new note at 0 and select it easily
})
export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)
  if (!isDeleted) return
  //Filter out the deleted note
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )
  set(selectedNoteIndexAtom, null) //unselect notes
})
