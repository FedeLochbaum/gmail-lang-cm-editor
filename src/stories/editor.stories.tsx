import * as React from "react"
import { Editor } from "../components/Editor"

export const EmptyEditor = () => <Editor value={''}/>
export const EditorWithSimpleQuery = () => <Editor value={'is:important bla'}/>
export const EditorWithComplexQuery = () => <Editor value={'is:important AND (label:important OR larger:10M) matchLabel'}/>
