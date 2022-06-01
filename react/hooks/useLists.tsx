import React, { useContext } from 'react'

interface ContextLists {
  gridLists: any 
  view: any
}

export const ContextLists = React.createContext<ContextLists>({
  gridLists: {},
  view: {},
})

export function useLists() {
  return useContext(ContextLists)
}
