import { chain, prop, path } from 'ramda'
import { syntaxTree } from '@codemirror/language'

export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'

export const isError = path(['type', 'isError'])

export const currentTextNode = (state, current) => state.sliceDoc(current.from, current.to)

export const rootParent = node => {
  let currentParent = node.parent

  while (currentParent && equalNodes(currentParent.firstChild, currentParent.lastChild)) {
    currentParent = currentParent.parent
  }

  return currentParent
}

export const analyzeAST = (tree, checks = []) => {
  tree.iterate({
    enter: (type, from, to, get) => {
      checks.map(check => check({ type, from, to, node: get() }))
    },
  })

  return chain(prop('diagnostics'), checks)
}

export const syntaxErrorNode = state => {
  let node
  syntaxTree(state).iterate({
    enter: (type, from, to, get) => {
      if (type.isError) {
        node = get()
      }
    },
  })
  return node
}

export const nodeInPosition = (state, cursorPos) => {
  let current = syntaxTree(state).resolveInner(cursorPos, -1)

  if (state.sliceDoc(current.to - 1, current.to) === ' ') {
    const error = syntaxErrorNode(state)
    if (error) { current = error }
  }

  return current
}

export const equalNodes = (tree1, tree2) => tree1 === tree2 ||
  (tree1.toString() === tree2.toString() && tree1.from === tree2.from && tree1.to === tree2.to)

const firstSiblingTo = to => (initialNode, admitErrorNode = true) => {
  const getTo = ({ firstChild, lastChild }) => (to === LEFT ? firstChild : lastChild)
  const getInverse = ({ firstChild, lastChild }) => (to === LEFT ? lastChild : firstChild)

  let current = initialNode
  let currentParent = current.parent

  // We go up until find a {TO} sibling
  while (currentParent && equalNodes(getTo(currentParent), current)) {
    current = currentParent
    currentParent = currentParent.parent
  }

  if (!currentParent) return

  // Select my {TO} sibling
  current = to === LEFT ? current.prevSibling : current.nextSibling

  // Go down as much as possible to the {INVERSE}
  while (getInverse(current)) {
    current = getInverse(current)
  }

  // Doesn't makes sense if the found sibling its itself
  if (equalNodes(initialNode, current)) return

  // If we want to return the first that is not an error, we have to call recursively
  if (!admitErrorNode && isError(current)) return firstSiblingTo(to)(current, admitErrorNode)

  return current
}

export const firstSibilingToLeft = firstSiblingTo(LEFT)
export const firstSibilingToRight = firstSiblingTo(RIGHT)

export const sourceContext = (state, pos) => {
  const current = nodeInPosition(state, pos)
  const text = isError(current) ? currentTextNode(state, current) : ''

  return {
    parent: rootParent(current),
    leftSibling: firstSibilingToLeft(current, true),
    rightSibling: firstSibilingToRight(current, true),
    isError: current.type.isError,
    from: current.from,
    to: current.to,
    current,
    text
  }
}

export const keywords = [
  'from',
  'to',
  'cc',
  'bcc',
  'label',
  'subject',
  'has',
  'is',
  'category',
  'filename',
  'after',
  'before',
  'older',
  'newer',
  'newer_than',
  'older_than',
  'deliveredto',
  'list',
  'in',
  'size',
  'larger',
  'smaller'
]