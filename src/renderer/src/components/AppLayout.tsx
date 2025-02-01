import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <div>
      <div></div>
      <main
        className={twMerge('flex flex-row  bg-gray-900/95 overflow-clip', className)}
        {...props}
      >
        {children}
      </main>
    </div>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('w-[300px] h-[87vh] logo-bg-r overflow-scroll my-4', className)}
      {...props}
    >
      <div className="mt-4  ">{children}</div>
    </aside>
  )
}
export const TopBar = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <>
      <div
        className={twMerge('mt-14 border flex  h-[50px] z-50 w-full bg-slate-950/90', className)}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto ', className)} {...props}>
      <div className="mt-2">{children}</div>
    </div>
  )
)
Content.displayName = 'Content'
