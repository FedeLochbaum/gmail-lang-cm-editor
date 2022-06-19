import React, { useMemo, useState } from 'react'
import autocomplete from '../extensions/Autocomplete'
import { evalQuery, sourceToQuery } from 'gmail-lang'
import { Editor } from './Editor'

const evalLangQuery = (source, dataSource) => evalQuery(sourceToQuery(source), dataSource)

const EmailEditorSearcher = ({ source, dataSource }) => {
  const [value, setValue] = useState(source)
  const emails = useMemo(() => evalLangQuery(value, dataSource), [value, dataSource])

  return (
    <div>
      <Editor value={value} externalExtensions={[autocomplete]} setValue={setValue} />
      <div >
        {emails.map(({ subject, body, from, to }) => <div key={`${subject}${body}`}>{body}</div>)}
      </div>
    </div>
  )
}

export default EmailEditorSearcher