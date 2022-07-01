import React, { useMemo, useState } from 'react'
import autocomplete from '../extensions/Autocomplete'
import { evalLangQuery, sourceToQuery } from 'gmail-lang'
import { Editor } from './Editor'

import './EmailEditorSearcher.css'

const Email = ({ email: {subject, body, from, to } }) => (<div
  className="Email"
  key={`${subject}${from}${to}${body}`}>
    <div key={from} className={'EmailRow'}>
      <span className="Title">From:</span> {from}
    </div>
    <div key={to} className={'EmailRow'}>
      <span className="Title">To:</span> {to}
    </div>
    <div key={subject} className={'EmailRow'}>
      <span className="Title">Subject:</span> {subject}
    </div>
    <div key={body} className={'EmailRow'}>
      <span className="Title">Body:</span> {body}
    </div>
</div>)

const EmailEditorSearcher = ({ source, dataSource, withAST = false }) => {
  const [value, setValue] = useState(source)
  const emails = useMemo(() => evalLangQuery(value, dataSource) || [], [value, dataSource])

  return (
    <div className="Component">
      <div className="Editor">
        <Editor value={value} externalExtensions={[autocomplete]} setValue={setValue} />
        <div className={'EmailsContainer'}>
          {emails.map((email, i) => <Email key={i} email={email}/>)}
        </div>
      </div>
      {withAST && <div className={'Ast'}>
        {value? <pre>{JSON.stringify(sourceToQuery(value), null, 2) }</pre> : null}
      </div>}
    </div>
  )
}

export default EmailEditorSearcher