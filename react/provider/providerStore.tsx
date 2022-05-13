import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'

import searchListsRaw from '../queries/searchListsRaw.gql'
import { ContextLists } from '../hooks/useLists'

const ProviderInterface: FC = (props) => {
  const { data: dataSearchListsRaw } = useQuery(searchListsRaw)
  const [valuesLists, setValuesLists] = useState()

  useEffect(() => {
    const valuesSearchListsRaw: any = dataSearchListsRaw?.searchListsRaw?.data
    console.log(valuesSearchListsRaw)
    setValuesLists(valuesLists)
  }, [dataSearchListsRaw])



  return (
    <ContextLists.Provider
      value={{
        valuesLists
      }}
    >
      {props.children}
    </ContextLists.Provider>
  )
}

export default ProviderInterface
