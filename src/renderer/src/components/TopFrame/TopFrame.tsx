import { appDirectoryName } from '@shared/constants'
import { ComponentProps } from 'react'
import { FaWindowMinimize } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'
import { TbWindowMaximize } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'
import Logo from '../../../../../resources/icon.png'

// -------------- BASE BUTTON COMPONENT  -------------- //
export type CtrlButtonProps = ComponentProps<'button'>
export const CtrlButton = ({ className, children, ...props }: CtrlButtonProps) => {
  return (
    <button
      className={twMerge(
        'rounded-full hover:bg-slate-800/50 p-2 transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// -------------- SEPERATE BUTTONS COMPONENTS  -------------- //
export const MinButton = ({ ...props }: CtrlButtonProps) => {
  const handleMinimize = () => window.context.minimize()
  return (
    <CtrlButton onClick={handleMinimize} {...props}>
      <FaWindowMinimize className="hover:text-blue-500" />
    </CtrlButton>
  )
}
export const MaxButton = ({ ...props }: CtrlButtonProps) => {
  const handleMaximize = () => window.context.maximize()
  return (
    <CtrlButton onClick={handleMaximize} {...props}>
      <TbWindowMaximize className="hover:text-yellow-500" />
    </CtrlButton>
  )
}
export const QuitButton = ({ ...props }: CtrlButtonProps) => {
  const handleQuit = () => window.context.quit()
  return (
    <CtrlButton onClick={handleQuit} {...props}>
      <IoIosCloseCircle className="hover:text-pink-500" />
    </CtrlButton>
  )
}
export const LogoButton = ({ ...props }: CtrlButtonProps) => {
  return (
    <CtrlButton {...props}>
      <img src={Logo} alt="logo" className="w-7 h-7 rounded-full" />
    </CtrlButton>
  )
}
// -------------- TRAFFIC LIGHT GROUP COMPONENT  -------------- //
export const TopFrame = () => {
  return (
    <>
      <div className="flex flex-row gap-6 justify-between items-center text-2xl h-16 px-4">
        <div>
          <LogoButton />
        </div>

        <div>
          <span className="font-bold mx-2">{`[${appDirectoryName}]`}</span>
        </div>

        <div>
          <MinButton />
          <MaxButton />
          <QuitButton />
        </div>
      </div>
    </>
  )
}
