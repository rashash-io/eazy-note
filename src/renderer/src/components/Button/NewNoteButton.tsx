import { ActionButton, ActionButtonProps } from '@components'
import { createEmptyNoteAtom } from '@store'
import { useSetAtom } from 'jotai'
import { VscNewFile } from 'react-icons/vsc'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const handleCreation = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton onClick={() => handleCreation()} {...props}>
      <VscNewFile className="hover:text-green-500  text-zinc-300" />
    </ActionButton>
  )
}
