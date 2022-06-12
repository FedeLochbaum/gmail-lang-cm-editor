import React, { useMemo, useRef, useState } from 'react'
import { basicSetup } from '@codemirror/basic-setup'
import { Gmail } from 'gmail-lang'
import CodeMirror from 'rodemirror'

const style = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 auto'
}

const noop = () => {}

export const Editor = ({ value = '', setValue = noop, externalExtensions = [] }) => {
  const editorView = useRef()
  debugger
  const [writeValue] = useState(value)

  const extensions = useMemo(() => [
    basicSetup,
    Gmail(externalExtensions),
    // linter(expectedType, withSyntheticMatch, linterEnabled, store),
  ], [externalExtensions])

  return (<CodeMirror
    value={writeValue}
    style={style}
    onUpdate={view => {
      if (view.docChanged) {
        const val = view.state.doc.toString()
        setValue(val)
      }
    }}
    onEditorViewChange={view => {
      if (!editorView.current && view) { editorView.current = view }
    }}
    extensions={extensions}
  />)
}