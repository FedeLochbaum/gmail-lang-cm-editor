import * as React from "react"
import { Editor } from "./components/Editor"
import EmailEditorSearcher from "./components/EmailEditorSearcher"
import autocomplete from "./extensions/Autocomplete"
import { difference, union, intersection, isNil } from 'ramda'

const emails = [
  {
    subject: 'Email 1',
    body: 'Hi, I am Pepe',
    from: 'pepe@pepe.pepe.com',
    to: 'fede@fede.com',
    timestamp: '2019-07-19T15:00:49',
  },
  {
    subject: 'Email 2',
    body: 'Hello! nice to meet you pepe',
    from: 'fede@fede.com',
    to: 'pepe@pepe.pepe.com',
    timestamp: '2022-06-20T22:05:00',
  },
  {
    subject: 'Email 3',
    body: `Hi fedelochbaum!

    A new version of the package gmail-lang (0.1.6) was published at 2022-06-19T22:00:49 from...`,
    from: 'support@npmjs.com',
    to: 'federico.lochbaum@gmail.com',
    timestamp: '2022-01-10T22:22:17',
  },
  {
    subject: 'Sir X',
    body: `Hi Federico,
    
    We will surely meet by person to speak about the possibility to make a PhD in France`,
    from: 'sirx@gmail.com',
    to: 'federico.lochbaum@gmail.com',
    timestamp: '2017-02-11T22:18:54',
  },
]

const matchWithLabel = (text, label) => !isNil(text?.match(label))

const matchs = label => ({ subject, body, from, to }) =>
  matchWithLabel(subject, label) ||
  matchWithLabel(body, label) ||
  matchWithLabel(from, label) ||
  matchWithLabel(to, label)

const dataSource = emails => ({
  allByKeyword: (keyword, value) => emails, // TODO
  filterByMatch: (filteredEmails, filter) => filteredEmails.filter(matchs(filter)),
  intersection,
  union,
  difference,
})

export const EmptyEditor = () => <Editor value={''}/>
export const EditorWithSimpleQuery = () => <Editor value={'is:important bla'}/>
export const EditorWithComplexQuery = () => <Editor value={'is:important AND (label:important OR larger:10M) matchLabel'}/>
export const EditorWithAutocomplete = () => <Editor value={''} externalExtensions={[autocomplete]}/>
export const EditorWithEvaluation = () => <EmailEditorSearcher source={''} dataSource={dataSource(emails)} />
