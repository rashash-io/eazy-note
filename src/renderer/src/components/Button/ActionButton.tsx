import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>
export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'p-2  btn border border-zinc-400/50  hover:bg-zinc-600/50 transition-colors duration-200 text-2xl rounded-xl ',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
