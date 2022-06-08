import type {
  DataGridState,
  DataViewState,
  UseDropdownReturnValue,
} from '@vtex/admin-ui'
import React, { useContext } from 'react'

interface ContextLists {
  gridLists: DataGridState<ItemsLists>
  view: DataViewState
  dateOptions: Array<{ id: number; label: string }>
  dateState: UseDropdownReturnValue<{
    id: number
    label: string
  }>
  statusOptions: Array<{ id: number; label: string }>
  statusState: UseDropdownReturnValue<{
    id: number
    label: string
  }>
}

export const ContextLists = React.createContext<ContextLists>({
  gridLists: {} as DataGridState<ItemsLists>,
  view: {} as DataViewState,
  dateOptions: [],
  dateState: {} as UseDropdownReturnValue<{
    id: number
    label: string
  }>,
  statusOptions: [],
  statusState: {} as UseDropdownReturnValue<{
    id: number
    label: string
  }>,
})

export function useLists() {
  return useContext(ContextLists)
}
