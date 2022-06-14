import type {
  UsePaginationReturn,
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
  pagination: UsePaginationReturn
}

export const ContextUser = React.createContext<ContextUser>({
  gridUsers: {} as DataGridState<ItemsListsUsers>,
  view: {} as DataViewState,
  search: '',
  getInputProps: () => ({} as GetInputPropsReturn),
  debouncedValue: '',
  pagination: {} as UsePaginationReturn,
})

export function useUser() {
  return useContext(ContextUser)
}
