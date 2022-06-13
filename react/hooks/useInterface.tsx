import React, { useContext } from 'react'

interface ContextInterface {
  searchEmailFilter: string | undefined
  setSearchEmailFilter: (searchEmailFilter: string) => void
  tableLists: boolean
  setTableLists: (tableLists: boolean) => void
  infoUserList: TotalizerListsUsers | undefined
  setInfoUserList: (infoUserList: TotalizerListsUsers) => void
}

export const ContextInterface = React.createContext<ContextInterface>({
  searchEmailFilter: '',
  setSearchEmailFilter: () => {},
  tableLists: false,
  setTableLists: () => {},
  infoUserList: undefined,
  setInfoUserList: () => {},
})

export function useInterface() {
  return useContext(ContextInterface)
}
