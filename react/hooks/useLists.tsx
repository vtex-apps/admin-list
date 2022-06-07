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
})

export function useLists() {
  return useContext(ContextLists)
}
