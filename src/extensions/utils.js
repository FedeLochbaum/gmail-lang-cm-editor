import { chain, prop } from 'ramda'

export const analyzeAST = (tree, checks = []) => {
  tree.iterate({
    enter: (type, from, to, get) => {
      checks.map(check => check({ type, from, to, node: get() }))
    },
  })

  return chain(prop('diagnostics'), checks)
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