import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SearchState } from '.'

export const useSearchResultLength = () => {
  const { resultListOfPeoples, resultListOfTopic } = useSelector((state: { search: SearchState }) => state.search)
  return useMemo(() => resultListOfPeoples.length + resultListOfTopic.length, [resultListOfPeoples.length, resultListOfTopic.length])
}



