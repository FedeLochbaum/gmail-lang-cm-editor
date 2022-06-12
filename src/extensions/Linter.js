import { linter as makeLinter } from '@codemirror/lint'
import { syntaxTree } from '@codemirror/language'
import { analyzeAST } from './utils'
import { isEmpty } from 'ramda'

const syntaxErrorCheck = () => {
  const diagnostics = []

  const _check = ({ type, from, to, node }) => {
    if (type.isError) {
      diagnostics.push({
        from,
        to,
        severity: 'error',
        message: `Syntax error`
      })
    }
  }

  _check.diagnostics = diagnostics

  return _check
}

// here we can add more linter checks, like type infering/checking or other common programming checks
const linterChecks = state => [
  syntaxErrorCheck(state),
]

export const lint = () => view => {
  const { state } = view
  const text = state.doc.toString()
  if (isEmpty(text)) return []

  return analyzeAST(syntaxTree(state), linterChecks(state))
}

const linter = makeLinter(lint(), { delay: 500 })

export default linter