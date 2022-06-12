import { autocompletion, completeFromList, ifNotIn } from '@codemirror/autocomplete'
import { map } from 'ramda'
import { keywordCompletion } from './Completion'
import { keywords } from './utils'

const keywordOptions = map(keywordCompletion)

const autocompleteKeywords = _keywords =>
  ifNotIn(['String Email Number'], completeFromList(keywordOptions(_keywords)))

const autocomplete = autocompletion({
  icons: true,
  override: [
    autocompleteKeywords(keywords)
  ],
})

export default autocomplete