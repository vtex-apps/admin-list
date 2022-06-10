import type { UsePaginationReturn } from '@vtex/admin-ui'
import React, { useContext } from 'react'

interface ContextLists {
  gridLists: any
  view: any
  dateState: any
  statusState: any
  search: string
  getInputProps: any
  debouncedValue: string
  modalState: any
  datePersonalizeInitial: any
  datePersonalizeFinal: any
  salveDatePersonalizate: () => void
  pagination: UsePaginationReturn
}

export const ContextLists = React.createContext<ContextLists>({
  gridLists: {},
  view: {},
  dateState: {},
  statusState: {},
  search: '',
  getInputProps: () => {},
  debouncedValue: '',
  modalState: {},
  datePersonalizeInitial: {},
  datePersonalizeFinal: {},
  salveDatePersonalizate: () => {},
  pagination: {} as UsePaginationReturn,
})

export function useLists() {
  return useContext(ContextLists)
}
