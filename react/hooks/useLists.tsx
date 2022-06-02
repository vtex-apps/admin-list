import React, { useContext } from 'react'

interface ContextLists {
  gridLists: any
  view: any
  dateOptions: Array<{ id: number; label: string }>
  dateState: any
  statusOptions: Array<{ id: number; label: string }>
  statusState: any
}

export const ContextLists = React.createContext<ContextLists>({
  gridLists: {},
  view: {},
  dateOptions: [],
  dateState: {},
  statusOptions: [],
  statusState: {},
})

export function useLists() {
  return useContext(ContextLists)
}
