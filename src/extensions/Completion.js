export const Types = {
  Keyword: 'keyword', // Default
}

export const keywordCompletion = keyword => ({
    label: keyword,
    apply: keyword,
    detail: 'keyword',
    type: Types.Keyword,
    boost: -99
  }
)