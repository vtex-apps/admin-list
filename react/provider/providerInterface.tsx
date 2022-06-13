import type { FC } from 'react'
import React, { useState } from 'react'
import { ContextInterface } from '../hooks/useInterface'

const ProviderInterface: FC = (props) => {
  const [searchEmailFilter, setSearchEmailFilter] = useState<string>()
  const [tableLists, setTableLists] = useState(false)
  const [infoUserList, setInfoUserList] = useState<TotalizerListsUsers>()


  return (
    <ContextInterface.Provider
      value={{
        searchEmailFilter,
        setSearchEmailFilter,
        tableLists,
        setTableLists,
        infoUserList,
        setInfoUserList,
      }}
    >
      {props.children}
    </ContextInterface.Provider>
  )
}

export default ProviderInterface
