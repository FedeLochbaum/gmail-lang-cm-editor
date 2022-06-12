import { EditorView } from '@codemirror/view'
import { HighlightStyle, tags as t } from '@codemirror/highlight'

const colors = {
  var: '#7c7874',
  keyword: '#0f6eb1',
  link: '#7d8799',
  atom: '#1c815a',
  number: '#1c815a',
  operator: '#1e6074',  
  string: '#b12d2d'
}

export const highlightStyle = HighlightStyle.define([
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: colors.atom },
  { tag: [t.number], color: colors.number },
  { tag: [t.variableName], color: colors.var },
  { tag: [t.string], color: colors.string },
  { tag: [t.keyword], color: colors.keyword },
  { tag: [t.compareOperator, t.arithmeticOperator, t.logicOperator, t.special(t.string)], color: colors.operator },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: colors.link, textDecoration: 'underline' },
  { tag: t.null, color: colors.atom },
])

const theme = [EditorView.theme({}, { dark: false }), highlightStyle]

export default theme