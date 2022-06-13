import type {
  DataGridState,
  DataViewState,
  GetInputPropsReturn,
} from '@vtex/admin-ui'
import React, { useContext } from 'react'

interface ContextUser {
  gridUsers: DataGridState<ItemsListsUsers>
  view: DataViewState
  search: string
  getInputProps: () => GetInputPropsReturn
  debouncedValue: string
}

export const ContextUser = React.createContext<ContextUser>({
  gridUsers: {} as DataGridState<ItemsListsUsers>,
  view: {} as DataViewState,
  search: '',
  getInputProps: () => ({} as GetInputPropsReturn),
  debouncedValue: '',
})

export function useUser() {
  return useContext(ContextUser)
}
