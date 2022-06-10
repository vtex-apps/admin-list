import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

import { ContextInterface } from '../hooks/useInterface'

const ProviderInterface: FC = (props) => {
  const [searchEmailFilter, setSearchEmailFilter] = useState<string>()
  const [tableLists, setTableLists] = useState(false)

  useEffect(() => {}, [tableLists])

  useEffect(() => {}, [searchEmailFilter])

  return (
    <ContextInterface.Provider
      value={{
        searchEmailFilter,
        setSearchEmailFilter,
        tableLists,
        setTableLists,
      }}
    >
      {props.children}
    </ContextInterface.Provider>
  )
}

export default ProviderInterface
