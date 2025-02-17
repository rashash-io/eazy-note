import { ActionButton, ActionButtonProps } from '@components'
import { deleteNoteAtom } from '@store'
import { useSetAtom } from 'jotai'
import { FaRegTrashCan } from 'react-icons/fa6'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => {
    deleteNote()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className=" text-zinc-300 hover:text-red-500" />
    </ActionButton>
  )
}
