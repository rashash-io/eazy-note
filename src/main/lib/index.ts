import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteContent, NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { BrowserWindow, dialog } from 'electron'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })
  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note...')
    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })
    //create welcome note
    await writeFile(`${rootDir}/Welcome.md`, content, { encoding: fileEncoding })
    //push it to array of notes
    notes.push('Welcome.md')
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}
export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)
  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()
  const fileContent = await readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
  return { content: fileContent } as NoteContent
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  console.info(`Writing note ${filename}`)

  writeFile(`${rootDir}/${filename}.md`, content.content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  console.log('Creating new note func from @lib')
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    filters: [{ name: 'Markdown', extensions: ['md'] }],
    message: 'Where would you like to save your note?',
    showsTagField: false
  })

  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Cannot create note',
      message: `Note must be created in ${rootDir}. Avoid creating notes in other directories.`
    })
    return false
  }

  console.info(`Creating new note ${filePath}`)
  await writeFile(filePath, '')
  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1, //default button when messagebox opens
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }
  console.info(`Deleting note ${filename}`)
  await remove(`${rootDir}/${filename}.md`)

  return true
}

//Handle maximize or minimize
export const handleMinMax = (type?: string) => {
  const win = BrowserWindow.getFocusedWindow()
  if (win == null) return
  if (type === 'max') {
    win.isMaximized() ? win.unmaximize() : win.maximize()
  } else if (type === 'min') win.minimize()
}
