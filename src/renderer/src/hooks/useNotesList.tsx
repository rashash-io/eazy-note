// import { notesAtom, selectedNoteIndexAtom } from '@store'
// import { useAtom, useAtomValue } from 'jotai'

// export const useNotesList = ({ onSelect  }: { onSelect?: () => void }) => {
//   const notes = useAtomValue(notesAtom)
//   const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)
//   const handleNoteSelect = (index: number) => async () => {
//     setSelectedNoteIndex(index)
//     if (onSelect) {
//       onSelect()
//     }
//   }
//   return {
//     notes,
//     selectedNoteIndex,
//     handleNoteSelect
//   }
// }

import { notesAtom, selectedNoteIndexAtom } from '@store'
import { useAtom, useAtomValue } from 'jotai'

export const useNotesList = () => {
  const notes = useAtomValue(notesAtom)
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)
  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)
  }
  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
