import { selectedNoteAtom } from '@store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  return !selectedNote ? null : (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span>{selectedNote.title} </span>
    </div>
  )
}
