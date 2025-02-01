import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <div>
      <div></div>
      <main className={twMerge('flex flex-row  bg-gray-900/95 ', className)} {...props}>
        {children}
      </main>
    </div>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('w-[350px] h-[100vh] logo-bg-r overflow-clip  ', className)}
      {...props}
    >
      <div className="mt-16  ">{children}</div>
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto  ', className)} {...props}>
      <div className="mt-2">{children}</div>
    </div>
  )
)
Content.displayName = 'Content'
