import {
  ActionButtonsRow,
  Content,
  DragableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotesList,
  RootLayout,
  Sidebar,
  TopBar,
  useSearchNotes
} from '@components'
import { useRef, useState } from 'react'

const App = () => {
  const [keyword, setKeyword] = useState('')
  const { filteredNotesState } = useSearchNotes(keyword)
  const contentContainerRef = useRef<HTMLDivElement>(null)
  console.log('filtered notes state APPPPPP', filteredNotesState)

  return (
    <>
      <DragableTopBar />

      <TopBar className="flex items-center justify-center gap-3">
        <input
          type="text"
          className="w-[350px] bg-slate-950/50 text-lg rounded-lg px-2 py-2 my-2  outline-none ring-1 ring-sky-600"
          placeholder="search for a note"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <FloatingNoteTitle />
        <ActionButtonsRow className="flex gap-3" />
      </TopBar>
      <RootLayout>
        <Sidebar className="p-4">
          {/* <NoteSearch /> */}
          <NotesList filteredNotes={filteredNotesState} />
          {/* <NotePreviewList className="mt-3 space-y-1"  /> */}
        </Sidebar>
        <Content
          ref={contentContainerRef}
          className="border-l bg-zinc-900/50  w-[350px] h-full border-l-white/20"
        >
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}
export default App
