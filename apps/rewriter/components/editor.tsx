'use client'
import { BlockNoteEditor, PartialBlock, filterSuggestionItems } from '@blocknote/core'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  DefaultReactSuggestionItem,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  SuggestionMenuController,
  TextAlignButton,
  UnnestBlockButton,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from '@blocknote/react'
import { MagicWand } from '@phosphor-icons/react/dist/ssr'
import { BlackButton, BlueButton } from './BlueButton'

const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: 'Continue with AI',
  aliases: ['ai', 'magic'],
  group: 'Magic',
  icon: <MagicWand size={18} />,
  subtext: 'Continue your idea with some extra inspiration.',
  onItemClick: () => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block

    // New block we want to insert.
    const helloWorldBlock: PartialBlock = {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
    }

    // Inserting the new block after the current one.
    editor.insertBlocks([helloWorldBlock], currentBlock, 'after')
  },
})

// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (editor: BlockNoteEditor): DefaultReactSuggestionItem[] => [
  insertHelloWorldItem(editor),
  ...getDefaultReactSlashMenuItems(editor),
]

export default function Editor() {
  const editor = useCreateBlockNote()
  return (
    <BlockNoteView
      editor={editor}
      theme={'light'}
      className='p-4 pt-16 bg-white'
      slashMenu={false}
      formattingToolbar={false}>
      <SuggestionMenuController
        triggerCharacter={'/'}
        getItems={async (query) => filterSuggestionItems(getCustomSlashMenuItems(editor), query)}
      />

      <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar>
            <div>
              <div>
                <BlockTypeSelect key={'blockTypeSelect'} />

                {/* Extra button to toggle blue text & background */}

                <FileCaptionButton key={'fileCaptionButton'} />
                <FileReplaceButton key={'replaceFileButton'} />

                <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
                <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
                <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
                <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} />
                {/* Extra button to toggle code styles */}
                <BasicTextStyleButton key={'codeStyleButton'} basicTextStyle={'code'} />

                <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
                <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />
                <TextAlignButton textAlignment={'right'} key={'textAlignRightButton'} />

                <ColorStyleButton key={'colorStyleButton'} />

                <NestBlockButton key={'nestBlockButton'} />
                <UnnestBlockButton key={'unnestBlockButton'} />

                <CreateLinkButton key={'createLinkButton'} />
              </div>
              <div>
                <BlueButton key={'customButton'} />
                <BlackButton key={'customButton'} />
              </div>
            </div>
          </FormattingToolbar>
        )}
      />
    </BlockNoteView>
  )
}
