import { chain, prop } from 'ramda'

export const analyzeAST = (tree, checks = []) => {
  tree.iterate({
    enter: (type, from, to, get) => {
      checks.map(check => check({ type, from, to, node: get() }))
    },
  })

  return chain(prop('diagnostics'), checks)
}