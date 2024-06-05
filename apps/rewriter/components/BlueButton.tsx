import { PartialBlock } from '@blocknote/core'
import '@blocknote/mantine/style.css'
import { useBlockNoteEditor, useComponentsContext, useEditorContentOrSelectionChange } from '@blocknote/react'
import { MagicWand } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'

// Custom Formatting Toolbar Button to toggle blue text & background color.
export function BlueButton() {
  const editor = useBlockNoteEditor()

  const Components = useComponentsContext()!

  // Tracks whether the text & background are both blue.
  const [isSelected, setIsSelected] = useState<boolean>(
    editor.getActiveStyles().textColor === 'blue' && editor.getActiveStyles().backgroundColor === 'blue'
  )

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setIsSelected(editor.getActiveStyles().textColor === 'blue' && editor.getActiveStyles().backgroundColor === 'blue')
  }, editor)

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Continue your idea with some extra inspiration'}
      onClick={() => {
        const currentBlock = editor.getTextCursorPosition().block

        const helloWorldBlock: PartialBlock = {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
        }

        editor.insertBlocks([helloWorldBlock], currentBlock, 'after')
      }}
      isSelected={isSelected}>
      <div className='flex items-center gap-1 text-purple-600'>
        <MagicWand size={16} /> Continue with AI
      </div>
    </Components.FormattingToolbar.Button>
  )
}

export function BlackButton() {
  const editor = useBlockNoteEditor()

  const Components = useComponentsContext()!

  // Tracks whether the text & background are both blue.
  const [isSelected, setIsSelected] = useState<boolean>(
    editor.getActiveStyles().textColor === 'blue' && editor.getActiveStyles().backgroundColor === 'blue'
  )

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setIsSelected(editor.getActiveStyles().textColor === 'blue' && editor.getActiveStyles().backgroundColor === 'blue')
  }, editor)

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Continue your idea with some extra inspiration'}
      onClick={() => {
        const currentBlock = editor.getTextCursorPosition().block

        const helloWorldBlock: PartialBlock = {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
        }

        editor.insertBlocks([helloWorldBlock], currentBlock, 'after')
      }}
      isSelected={isSelected}>
      <div className='text-purple-600 font-medium'>Make more casual</div>
    </Components.FormattingToolbar.Button>
  )
}
