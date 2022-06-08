import type { DataGridState, DataViewState } from '@vtex/admin-ui'
import React, { useContext } from 'react'

interface ContextUser {
  gridUsers: DataGridState<ItemsListsUsers>
  view: DataViewState
}

export const ContextUser = React.createContext<ContextUser>({
  gridUsers: {} as DataGridState<ItemsListsUsers>,
  view: {} as DataViewState,
})

export function useUser() {
  return useContext(ContextUser)
}
