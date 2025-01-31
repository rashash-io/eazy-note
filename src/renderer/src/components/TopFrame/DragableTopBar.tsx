//import { TopFrame } from '@renderer/components/TopFrame/index'
import { TopFrame } from '@renderer/components/TopFrame/'

export const DragableTopBar = () => {
  return (
    <>
      <header className="absolute inset-0 z-10 h-14 bg-slate-950 rounded-t-3xl   "></header>
      <div className="absolute w-full h-14 z-20 top-0">
        <TopFrame />
      </div>
      <div className="h-10 z-20"></div>
    </>
  )
}
