import React, { useContext } from 'react'

interface ContextInterface {
  searchEmailFilter: string | undefined
  setSearchEmailFilter: (searchEmailFilter: string) => void
  tableLists: boolean
  setTableLists: (tableLists: boolean) => void
}

export const ContextInterface = React.createContext<ContextInterface>({
    searchEmailFilter: '',
    setSearchEmailFilter: () => {},
    tableLists: false,
    setTableLists: () => {},
})

export function useInterface() {
  return useContext(ContextInterface)
}
